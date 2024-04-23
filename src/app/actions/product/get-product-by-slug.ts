import { prisma } from "@/lib/prisma"

const getProductBySlug = async(slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      },
      where: {
        slug: slug
      }
    })

    if(!product) return null;

    return {
      ...product,
      images: product.ProductImage.map(image => image.url)
    }
    
  } catch (error) {
    throw new Error('Error al obtener el producto')
  }
  
}

export default getProductBySlug