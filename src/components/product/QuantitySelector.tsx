'use client'
import { useState } from "react"
import { IoAdd, IoAddCircleOutline, IoRemove, IoRemoveCircleOutline } from "react-icons/io5"

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
      <div className="border flex p-2 bg-gray-100 rounded">
        <button onClick={()=>quantityChange(-1)}>
          <IoRemove size={20} className="text-gray-500"/>
        </button>
        <span className="w-20 px-5 text-center">{quantity}</span>
        <button onClick={()=>quantityChange(+1)}>
          <IoAdd size={20} className="text-gray-500"/>
        </button>
      </div>
    </div>
  )
}

export default QuantitySelector