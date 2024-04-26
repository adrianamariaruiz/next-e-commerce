'use client'

import { useCartStore } from "@/store/cart/cart-store"
import { useEffect, useState } from "react"

const OrderSummary = () => {

  const [ready, setReady] = useState(false)
  const {subTotal, tax, total, totalItemsCart} = useCartStore(state => state.getCartSummary())

  useEffect( () => {
    setReady(true)
  }, [] )

  if(!ready){
    return <p>Loading...</p>
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Products</span>
      <span className="text-right">{totalItemsCart} articles</span>
      <span>subtotal</span>
      <span className="text-right">$ {subTotal}</span>
      <span>Taxes (15%)</span>
      <span className="text-right">$ {tax}</span>
      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">$ {total}</span>
    </div>
  )
}

export default OrderSummary