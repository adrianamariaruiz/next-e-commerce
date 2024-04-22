import ProductGrid from "@/components/products/grid/ProductGrid";
import Title from "@/components/ui/title/Title";
// import { initialData } from "@/seed/seed";
import getPaginationProductsImages from "../actions/product/product-pagination";
import { redirect } from "next/navigation";
import Pagination from "@/components/ui/pagination/Pagination";

// const products = initialData.products;

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function CommercePage({searchParams}: Props) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, currentPage, totalPages } = await getPaginationProductsImages({page});

  if( products.length === 0 ){
    redirect('/')
  } 

  return (
    <div>
      <Title 
        title="E-Commerce"
        subtitle="All products"
        className="mb-2"
      />
      <ProductGrid
        products={products}
      />
      <Pagination totalPages={totalPages}/>
    </div>
  );
}
