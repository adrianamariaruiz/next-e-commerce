import { initialData } from "@/seed/seed";
import {ValidSizes} from '@/interfaces/product.interface'
import clsx from "clsx";

const products = initialData.products;

interface Props {
  sizeSelected?: ValidSizes
  availableSize: ValidSizes[]
  onSizeSelected: (size: ValidSizes) => void
}

const SizeSelector = ({sizeSelected, availableSize, onSizeSelected}:Props) => {

  return (
    <div className="mb-5">
      <h3 className="font-bold my-2">Size</h3>
      <div className="flex gap-2">
        {
          availableSize.map((size) => (
              <button 
                key={size} 
                onClick={() => onSizeSelected(size)}
                className={
                  clsx(
                    "text-lg h-11 w-11 border border-gray-500 rounded-full",
                    {
                      'bg-tangerine-600 text-white border-none': size === sizeSelected
                    }
                  )
                }
              >{size}</button>
              ))
        }
      </div>
    </div>
  )
}

export default SizeSelector