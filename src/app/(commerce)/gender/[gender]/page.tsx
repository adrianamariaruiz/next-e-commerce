export const revalidate = 60;

import getPaginationProductsImages from "@/app/actions/product/product-pagination";
import ProductGrid from "@/components/products/grid/ProductGrid";
import Pagination from "@/components/ui/pagination/Pagination";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

const products = initialData.products;

interface Props {
  params:{
    gender: string
  }
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({searchParams, params}: Props) {

  const {gender} = params

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { products, currentPage, totalPages } = await getPaginationProductsImages({page, gender: gender as Gender});

  if( products.length === 0 ){
    redirect('/')
  } 

  // const productsByGender = products.filter(pdt => pdt.gender === id)

  // if(id === 'kids'){
  //   notFound()
  // }

  return (
    <div>
      <div>
      <Title 
        title={gender}
        subtitle={`Products for ${gender}`}
        className="mb-2"
      />
      <ProductGrid
        products={products}
      />
      <Pagination totalPages={totalPages}/>
    </div>
    </div>
  );
}