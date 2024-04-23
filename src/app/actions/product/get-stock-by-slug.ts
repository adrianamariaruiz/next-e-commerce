'use server'

import { prisma } from "@/lib/prisma"

export const getStockBySlug = async(slug: string): Promise<number> => {
  // retorna la cantidad que hay en stock
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug: slug
      },
      select: {
        inStock: true
      }
    })

    return stock?.inStock ?? 0
    
  } catch (error) {
    throw new Error('no se encontro el número de productos disponibles')
  }
}