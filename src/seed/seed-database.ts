import { initialData } from "./seed";
import {prisma} from '../lib/prisma';
import { countries } from "./seed-countries";

async function main(){

  // 1. Borra registros previos

  await prisma.orderAddress.deleteMany(),
  await prisma.orderItem.deleteMany(),
  await prisma.order.deleteMany(),
  await prisma.userAddress.deleteMany(),
  await prisma.user.deleteMany(),
  await prisma.country.deleteMany(),

  await prisma.productImage.deleteMany(),
  await prisma.product.deleteMany(),
  await prisma.category.deleteMany()


  // 2.insertar todas las categorias
  const {categories, products, users} = initialData

  await prisma.user.createMany({
    data: users
  })

  await prisma.country.createMany({
    data: countries
  })

  const categoriesData = categories.map((category) => ({
    name: category
  }))

  await prisma.category.createMany({
    data: categoriesData
  })

  // Para insertar un dato
  // await prisma.category.create({
  //   data:{
  //     name: 'shirts',
  //   }
  // })


  // 3. Crear productos
  // tomar el id de la categoria de la bd
  const categoriesDB = await prisma.category.findMany();

  
  // recorro las categorias para obtener {categoryName: categoryId}
  const categoriesMap = categoriesDB.reduce( (map, category) => {
    map[ category.name.toLowerCase() ] = category.id
    return map
  }, {} as Record<string, string> )


  products.forEach( async(product) => {
    
    const {images, type, ...prods} = product;
    
    // insertar productos
    const productDB = await prisma.product.create({
      data: {
        ...prods,
        categoryId: categoriesMap[type]
      }
    })

    // insertar imagenes
    const imagesData = images.map( image => ({
      url: image,
      productId: productDB.id
    }))
    await prisma.productImage.createMany({
      data: imagesData
    })

  } )
  
  // Para insertar un producto
  // const {images, type, ...product1} = products[0] /** con esto saca el image y el type y con esto (...product1 => me trae los demas) */
  // await prisma.product.create({
  //   data: {
  //     ...product1,
  //     categoryId: categoriesMap['shirts']
  //   }
  // })

}

(
  ()=>{

    if(process.env.NODE_ENV === 'production') return;

    main();

  }
)();