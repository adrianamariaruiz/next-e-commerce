import getProductBySlug from "@/app/actions/product/get-product-by-slug";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { ProductForm } from "./components/ProductForm";
import getCategories from "@/app/actions/category/get-categories";

interface Props {
  params: {
    slug: string;
  }
}


export default async function ProductPage({params}: Props) {

  const {slug} = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  // TODO: new

  if(!product){
    redirect('/admin/products')
  }

  const title = (slug === 'new') ? 'New product' : 'Edit product'

  // TODO: id y el name de category
  // get-categories.ts

  return (
    <>
      <Title title={title}/>
      <ProductForm product={product} categories={categories}/>
    </>
  );
}