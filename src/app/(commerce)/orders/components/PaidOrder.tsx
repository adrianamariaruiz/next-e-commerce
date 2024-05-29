'use client'

import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5";

interface Props {
  paid: boolean
}

const PaidOrder = ({paid}: Props) => {

  return (
    <>
      <div className={
        clsx(
          "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
          {
            'bg-red-500': !paid,
            'bg-green-700': paid,
          }
        )
      }>
        <IoCardOutline size={ 30 } />
        {
          paid ? <span className="mx-2">Paid</span> : <span className="mx-2">Pending to pay</span>
        }
        
      </div>
    
    </>
  )
}

export default PaidOrder