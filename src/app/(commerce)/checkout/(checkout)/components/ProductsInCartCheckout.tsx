'use client'

import currentFormat from "@/app/utils/currentFormat"
import { Product } from "@/interfaces/product.interface"
import { useCartStore } from "@/store/cart/cart-store"
import Image from "next/image"
import { useEffect, useState } from "react"


const ProductsInCartCheckout = () => {

  const [ready, setReady] = useState(false)
  const productsInCart = useCartStore(state => state.cart)


  useEffect( () => {
    setReady(true)
  }, [] )

  if(!ready){
    return <p>Loading...</p>
  }

  return (
    <div>
      {/* items */}
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <Image
              src={`/products/${product.image}`}
              width={100}
              height={100}
              style={{
                width: '100px',
                height: '100px'
              }}
              alt={product.title}
              className="mr-5 rounded"
            />
            <div>
              <p>{product.title}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Size: {product.size}</p>
              <p className="font-bold">{currentFormat(product.price * product.quantity)}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ProductsInCartCheckout