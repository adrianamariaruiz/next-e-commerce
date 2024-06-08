'use server'

import { prisma } from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import {z} from 'zod';

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform( val => Number(val.toFixed(2)) ),
  inStock: z.coerce
    .number()
    .min(0)
    .transform( val => Number(val.toFixed(0)) ),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform( val => val.split(',') ),
  tags: z.string(),
  gender: z.nativeEnum(Gender), 
})



export const createUpdateProduct = async( formData: FormData ) => {
  console.log(formData)
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse( data );
 
  if ( !productParsed.success) {
    console.log( productParsed.error );
    return { ok: false }
  }

  const product = productParsed.data
  console.log(product)

  product.slug = product.slug.toLowerCase().replace(/ /g, '-' ).trim();

  // extraigo el id del product para evitar problemas en la transaccion
  const { id, ...rest } = product;

  const prismaTx = await prisma.$transaction(async(tx) => {

    let product: Product

    if(id){
      // actualizar
      product = await prisma.product.update({
        where: {id},
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[]
          },
          tags: {
            set: rest.tags.split(',').map(tag=>tag.trim().toLowerCase())
          }
        }
      })

      console.log({updatedProduct: product})

    }else{
      // crear
    }

    return {
      
    }

  })

  // TODO: revalidate path  

  return {
    ok: true
  }
 

}