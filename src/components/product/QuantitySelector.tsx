'use client'
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
}

const QuantitySelector = ({quantity}:Props) => {
  
  const [quantityProduct, setQuantityProduct] = useState(1)

  const quantityChange = (value: number) => {
    if(quantityProduct + value < 1) return;
    setQuantityProduct(quantityProduct+value)
  }

  return (
    <div className="flex">
      <button onClick={()=>quantityChange(-1)}>
        <IoRemoveCircleOutline size={30} className="text-gray-500"/>
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{quantityProduct}</span>
      <button onClick={()=>quantityChange(+1)}>
        <IoAddCircleOutline size={30} className="text-gray-500"/>
      </button>
    </div>
  )
}

export default QuantitySelector