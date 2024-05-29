'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { setTransactionId } from "@/app/actions/payment/set-transaction-id"
import { paypalCheckPayment } from "@/app/actions/payment/paypal-check-payment"

interface Props {
  orderId: string
  amount: number
}

const PaypalBtn = ({orderId, amount}: Props) => {

  const [{isPending}] = usePayPalScriptReducer()

  const roundedAmount = (Math.round(amount * 100)/ 100)

  if(isPending){
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded mt-2"></div>
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: `${roundedAmount}`
          }
        }
      ]
    })

    // console.log({transactionId})
    
    const { ok } = await setTransactionId( orderId, transactionId )

    if(!ok){
      throw new Error('could not update order')
    }

    return transactionId
  }

  const onApprove = async(data: OnApproveData, actions: OnApproveActions): Promise<void> => {
    // console.log('onApprove')
    const details = await actions.order?.capture()
    if(!details){
      return
    }

    await paypalCheckPayment(details.id || '')
  }

  return (
    <PayPalButtons 
      // style={{ layout: "horizontal" }}
      createOrder={createOrder}
      onApprove={ onApprove }
    />
  )
}

export default PaypalBtn