'use client'

import { getStockBySlug } from "@/app/actions/product/get-stock-by-slug";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

const StockLabel = ({ slug }: Props) => {

  const [inStock, setInStock] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockBySlug(slug)
      setInStock(stock)
      setLoading(false)
    }

    getStock()
  }, [slug, setInStock])


  return (
    <>
      {
        loading
          ? (<h1 className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse`}>
            &nbsp;
          </h1>)
          : (<h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
            Stock: {inStock}
          </h1>)
      }


    </>
  )
}

export default StockLabel