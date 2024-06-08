'use server'

import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma"

export const getPaginatedOrders = async() => {
  const session = await auth()

  if(session?.user.role !== 'admin'){
    return {
      ok: false,
      message: 'must be authenticated as administrator'
    }
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      creteDate: 'desc'
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  })

  return {
    ok: true,
    orders: orders
  }
}