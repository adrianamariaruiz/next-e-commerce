'use client'

import QuantitySelector from "@/components/product/QuantitySelector"
import { CartProduct, Product } from "@/interfaces/product.interface"
import { useCartStore } from "@/store/cart/cart-store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Props {
  product: Product
}

const ProductsInCart = () => {

  const [ready, setReady] = useState(false)
  const productsInCart = useCartStore(state => state.cart)
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
  const removeProduct = useCartStore(state => state.removeProduct)


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
              <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
                <p>{product.title}</p>
              </Link>
              <p>Size: {product.size}</p>
              <p>${product.price}</p>
              
              <QuantitySelector 
                quantity={product.quantity} 
                onQuantitySelected={(quantity)=>updateProductQuantity(product, quantity)}
              />

              <button className="underline mt-3" onClick={() => removeProduct(product)}>Remove</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ProductsInCart