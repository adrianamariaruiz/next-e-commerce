import { prisma } from "@/lib/prisma"

const getCategories = async() => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return categories

  } catch (error) {
    throw new Error('Error obtaining category')
  }
}

export default getCategories