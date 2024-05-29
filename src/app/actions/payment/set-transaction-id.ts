'use server'

import { prisma } from "@/lib/prisma"

export const setTransactionId = async(orderId: string, transactionId: string) => {

  try {

    const orderTransactionId = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        transactionId: transactionId
      }
    })

    if(!orderTransactionId){
      return {
        ok: false,
        message: `An order with id ${orderId} was not found`
      }
    }

    return {
      ok: true
    }
    
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'could not update order'
    };
  }

}