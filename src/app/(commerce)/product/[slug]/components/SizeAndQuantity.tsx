'use client'

import QuantitySelector from "@/components/product/QuantitySelector"
import SizeSelector from "@/components/product/SizeSelector"
import type { CartProduct, Product, ValidSizes } from "@/interfaces/product.interface"
import { useCartStore } from "@/store/cart/cart-store"
import { useState } from "react"

interface Props {
  product: Product
}

const SizeAndQuantity = ({product}: Props) => {

  const addProductToCart = useCartStore(state => state.addProductTocart)

  const [size, setSize] = useState<ValidSizes|undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState(false);
  

  const addToCart = () => {
    setSelectedSize(true)
    if(!size) return 

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }
    
    addProductToCart(cartProduct)
    setSelectedSize(false)
    setQuantity(1)
    setSize(undefined)

  }

  return (
    <>
      {/* size selector */}
        <SizeSelector 
          sizeSelected={size}
          availableSize={product.sizes}
          onSizeSelected={(size) => setSize(size)}
        />

        {/* quantity selector */}
        {
          selectedSize && !size && (<span className="mt-2 text-red-600 fade-in">Debe seleccionar una talla</span>)
        }
        <QuantitySelector 
          quantity={quantity}
          onQuantitySelected={setQuantity}
        />

        <button 
          onClick={addToCart}
          className='btn-primary my-5'
        >Add to cart</button>
    </>
  )
}

export default SizeAndQuantity