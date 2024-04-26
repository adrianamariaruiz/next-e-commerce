'use client'
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
  onQuantitySelected: (value: number) => void
}

const QuantitySelector = ({quantity, onQuantitySelected}:Props) => {
  
  const quantityChange = (value: number) => {
    if(quantity + value < 1) return;
    
    onQuantitySelected(quantity+value)
  }

  return (
    <div className="flex my-5">
      <button onClick={()=>quantityChange(-1)}>
        <IoRemoveCircleOutline size={30} className="text-gray-500"/>
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{quantity}</span>
      <button onClick={()=>quantityChange(+1)}>
        <IoAddCircleOutline size={30} className="text-gray-500"/>
      </button>
    </div>
  )
}

export default QuantitySelector