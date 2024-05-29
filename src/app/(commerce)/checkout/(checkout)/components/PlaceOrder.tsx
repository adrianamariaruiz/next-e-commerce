'use client'

import { placeOrder } from "@/app/actions/order/place-order"
import currentFormat from "@/app/utils/currentFormat"
import { useAddress } from "@/store/address/address-store"
import { useCartStore } from "@/store/cart/cart-store"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const PlaceOrder = () => {

  const router = useRouter();

  const [loaded, setLoaded] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const address = useAddress( state => state.address )
  const {subTotal, tax, total, totalItemsCart} = useCartStore(state => state.getCartSummary())
  const cart = useCartStore( state => state.cart )
  const clearCart = useCartStore(state => state.clearCart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const onPlaceOrder = async() => {
    setPlacingOrder(true)

    const productsToOrder = cart.map( product => (
      {
        productId: product.id,
        quantity: product.quantity,
        size: product.size
      }
    ) )

    // server action
    const res = await placeOrder(productsToOrder, address)

    if(!res.ok){
      setPlacingOrder(false)
      setErrorMessage(res.message)
      return;
    }

    clearCart();
    router.replace('/orders/' + res.order?.id )

  }

  if(!loaded){
    return <p>Loading...</p>
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
          <h2 className="text-2xl mb-2 font-semibold">Delivery address</h2>
          <div className="mb-5">
            <p className="text-xl">{address.firstName} {address.lastName}</p>
            <p>{address.address}</p>
            <p>{address.address2}</p>
            <p>{address.postalCode}</p>
            <p>{address.city} - {address.country}</p>
            <p>Cel {address.phone}</p>
          </div>

          <hr />

          <h2 className="text-2xl my-4">Checkout</h2>
          <div className="grid grid-cols-2">
            <span>No. Products</span>
            <span className="text-right">{totalItemsCart} articles</span>
            <span>subtotal</span>
            <span className="text-right">{currentFormat(subTotal)}</span>
            <span>Taxes (15%)</span>
            <span className="text-right">{currentFormat(tax)}</span>
            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">{currentFormat(total)}</span>
          </div>
          <div className="mt-5 mb-2 w-full">
            <p className="mb-5">
              <span className="text-xs">
                 By clicking the submit order button, you agree to our <a href="#" className="underline">terms and conditions</a> and <a href="#" className="underline">privacy policy</a>
              </span>
            </p>

            <p className="text-red-600">{errorMessage}</p>
           
            <button 
            onClick={onPlaceOrder}
              className={
                clsx( "flex justify-center",
                  {
                    'btn-primary': !placingOrder,
                    'btn-disabled': placingOrder
                  }
                )
              }
              // href="/orders/123"
            >
              Send order
            </button>
          </div>
        </div>
  )
}

export default PlaceOrder