import ProductGrid from "@/components/products/grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function CommercePage() {
  return (
    <div>
      <Title 
        title="Commerce"
        subtitle="All products"
        className="mb-2"
      />
      <ProductGrid
        products={products}
      />
    </div>
  );
}
