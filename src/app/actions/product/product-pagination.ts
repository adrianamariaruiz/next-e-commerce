'use server'

import { prisma } from "@/lib/prisma"
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

const getPaginationProductsImages = async({
  page = 1,
  take = 12, 
  gender
}: PaginationOptions) => {

  // valido que lo que viene por la url si sea un number
  if( isNaN( Number(page) ) ) page = 1;

  if( page < 1 ) page = 1;

  try {
    // trae todos los produtos
    const products = await prisma.product.findMany({
      take: take, /*con el take le pongo el numero de productos que quiero ver*/
      skip: ( page - 1 ) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },
      where: {
        gender: gender
      }
    })
    
    const totalProducts = await prisma.product.count({
      where: {
        gender: gender
      }
    })
    
    const totalPages = Math.ceil(totalProducts / take);
    
    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map( product => ({
        ...product,
        images: product.ProductImage.map(image => image.url)
      }) )
    }
  } catch (error) {
    throw new Error('No se pudo cargar los productos')
  }
  
}

export default getPaginationProductsImages