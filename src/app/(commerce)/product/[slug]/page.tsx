import QuantitySelector from "@/components/product/QuantitySelector";
import SizeSelector from "@/components/product/SizeSelector";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const products = initialData.products;

interface Props {
  params: {
    slug: string
  }
}

export default function ProductSlugPage({params}:Props) {

  const {slug} = params
  const product = products.find(prt => prt.slug === slug)
  
  if(!product){
    return notFound()
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* slideshow */}
      <div className="col-span-1 md:col-span-2 border border-solid border-red-500">
        hola
      </div>

      <div className="col-span-1 border border-solid border-green-500">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}</p>
        
        {/* selector de talla */}
        <SizeSelector 
          sizeSelected={product.sizes[0]}
          availableSize={product.sizes}
        />


        {/* selector de cantidad */}
        <QuantitySelector quantity={2}/>

        <button className='btn-primary my-5'>Add to cart</button>

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
      

    </div>
  );
}