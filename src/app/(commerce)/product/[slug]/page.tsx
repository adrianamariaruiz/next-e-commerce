import ProductMobileSlideShow from "@/components/product/ProductMobileSlideShow";
import ProductSlideShow from "@/components/product/ProductSlideShow";
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
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      
      {/* slideshow */}
      <div className="col-span-1 md:col-span-2 lg:px-28">
        
        {/* for mobile */}
        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* for desktop */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Description */}
      <div className="col-span-1 px-2">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        
        {/* size selector */}
        <SizeSelector 
          sizeSelected={product.sizes[0]}
          availableSize={product.sizes}
        />

        {/* quantity selector */}
        <QuantitySelector quantity={2}/>
        <button className='btn-primary my-5'>Add to cart</button>
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}