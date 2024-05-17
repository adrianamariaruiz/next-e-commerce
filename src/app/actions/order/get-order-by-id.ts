"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrderById = async (id: string) => {

  const session = await auth();

  if(!session?.user){
    return {
      ok: false,
      message: 'most be authenticated'
    }
  }

  try {
    const order = await prisma.order.findUnique({
      include: {
        OrderAddress: true
      },
      where: {
        id: id,
      },
    });

    // obtengo los items
    const orderItems = await prisma.orderItem.findMany({
      include: {
        product: {
          include:{
            ProductImage: {
              select: {
                url: true
              },
              take: 1
            }
          }
        }
      },
      where: {
        orderId: id
      }
    })


    console.log({order})
    console.log('orderitem back', {orderItems})
    // console.log({product})

    if(!order) throw `${id} does not exist`

    if(session.user.role === 'user'){
      if(session.user.id !== order.userId){
        throw `${id} is not that user's`
      }
    }

    return {
      ok: true,
      orderItems: orderItems,
      order: order
    }

  } catch (error) {
    console.log(error)
    // throw new Error("Error obtaining product")
    return {
      ok: false,
      message: 'talk to the administrator'
    }
  }
};

