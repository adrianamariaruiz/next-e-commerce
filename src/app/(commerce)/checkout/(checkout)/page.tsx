import Title from "@/components/ui/title/Title";
// import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import ProductsInCartCheckout from "./components/ProductsInCartCheckout";
import PlaceOrder from "./components/PlaceOrder";



export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
    <div className="flex flex-col w-[1000px]">
      <Title
        title='Check order'
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* carrito */}
        <div className="flex flex-col mt-5">
          <span className="text-xl">Edit items</span>
          <Link href='/cart' className="underline mb-5">
            Edit order
          </Link>
        

        {/* items */}
        <ProductsInCartCheckout/>
        </div>

        {/* checkout */}
        <PlaceOrder/>

      </div>
    </div>
  </div>
  );
}

