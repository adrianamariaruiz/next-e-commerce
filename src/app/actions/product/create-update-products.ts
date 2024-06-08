'use server'

import { prisma } from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
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

  try {
     const prismaTx = await prisma.$transaction(async(tx) => {

    let product: Product

    if(id){
      // update
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

    }else{
      // create
      product = await prisma.product.create({
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
    }

    console.log({product})

    return {
      product
    }

  })

    // TODO: revalidate path 
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${product.slug}`)
    revalidatePath(`/products/${product.slug}`)

  return {
    ok: true,
    product: prismaTx.product
  }

  } catch (error) {
    return {
      ok: false,
      message: 'Could not update or create'
    }
    
  }
 
}