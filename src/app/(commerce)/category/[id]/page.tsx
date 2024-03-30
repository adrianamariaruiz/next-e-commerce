import ProductGrid from "@/components/products/grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const products = initialData.products;

interface Props {
  params: {
    id: string
  }
}

export default function CategoryPage({params}: Props) {

  const {id} = params

  const productsByGender = products.filter(pdt => pdt.gender === id)

  // if(id === 'kids'){
  //   notFound()
  // }

  return (
    <div>
      <div>
      <Title 
        title={id}
        subtitle={`Products for ${id}`}
        className="mb-2"
      />
      <ProductGrid
        products={productsByGender}
      />
    </div>
    </div>
  );
}