export const revalidate = 604800;

import getProductBySlug from "@/app/actions/product/get-product-by-slug";
import ProductMobileSlideShow from "@/components/product/ProductMobileSlideShow";
import ProductSlideShow from "@/components/product/ProductSlideShow";
import StockLabel from "@/components/product/StockLabel";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import SizeAndQuantity from "./components/SizeAndQuantity";

// import { initialData } from "@/seed/seed";
// const products = initialData.products;

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Product not found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Product not found',
      description: product?.description ?? '',
      // images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductSlugPage({params}:Props) {

  const {slug} = params
  // const product = products.find(prt => prt.slug === slug)

  const product = await getProductBySlug(slug);
  
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
        <StockLabel slug={product.slug}/>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        
        <SizeAndQuantity product={product}/>
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}