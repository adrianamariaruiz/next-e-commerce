"use server";

import { auth } from "@/auth.config";
import { Address } from "@/interfaces/address.interface";
import { ValidSizes } from "@/interfaces/product.interface";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: ValidSizes;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // verify user session
  if (!userId) {
    return {
      ok: false,
      message: "There is no user session",
    };
  }

  // get products information
  // busco en la tabla de productos, todos los productos cuyo id exista en el arreglo de ProductToOrder[]
  const allProducts = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // calcular los montos
  const itemsOrder = productIds.reduce(
    (count, prod) => count + prod.quantity,
    0
  );

  // totales de tax, subtotal, total
  const { subtotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = allProducts.find(
        (product) => product.id === item.productId
      );

      if (!product) throw new Error(`${item.productId} does not exist - 500`);

      const subtotal = product.price * productQuantity;

      totals.subtotal += subtotal;
      totals.tax += subtotal * 0.15;
      totals.total += subtotal * 1.15;

      return totals;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  // Crear la transaccion de base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // actualizar el stock de los productos (si no hay stock, revierte transaccion)
      const updateProductsPromises = allProducts.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} does not have a defined quantity`);
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updateProductsPromises);
      // verificar valores negativos en existencia - no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} does not have enough inventory`);
        }
      });

      // crear orden - encabezado - detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsOrder,
          subTotal: subtotal,
          tax: tax,
          total: total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  allProducts.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // validar si el precio en 0 lanzar un error

      // crear la direccion de la orden
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        updateProducts: updatedProducts,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx
    }

  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
