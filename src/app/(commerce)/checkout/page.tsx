import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

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
        {
          productsInCart.map(product => (
            <div key={product.slug} className="flex mb-5">
              <Image
                src={`/products/${product.images[0]}`}
                width={100}
                height={100}
                style={{
                  width: '100px',
                  height: '100px'
                }}
                alt={product.title}
                className="mr-5 rounded"
              />
              <div>
                <p>{product.title}</p>
                <p>${product.price} x 3</p>
                <p className="font-bold">Subtotal: ${product.price * 3}</p>
              </div>
            </div>
          ))
        }
        </div>

        {/* checkout */}
        <div className="bg-white rounded-xl shadow-xl p-7">
          <h2 className="text-2xl mb-2 font-semibold">Delivery address</h2>
          <div className="mb-5">
            <p className="text-xl">Adriana Ruiz</p>
            <p>Av. Siempre viva 123</p>
            <p>Col. Centro</p>
            <p>Colombia</p>
            <p>Cel 3203682218</p>
            <p>123.123.123</p>
          </div>

          <hr />

          <h2 className="text-2xl my-4">Checkout</h2>
          <div className="grid grid-cols-2">
            <span>No. Products</span>
            <span className="text-right">3 articles</span>
            <span>subtotal</span>
            <span className="text-right">$ 100</span>
            <span>Taxes (15%)</span>
            <span className="text-right">$ 100</span>
            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">$ 100</span>
          </div>
          <div className="mt-5 mb-2 w-full">
            <p className="mb-5">
              <span className="text-xs">
                 By clicking the submit order button, you agree to our <a href="#" className="underline">terms and conditions</a> and <a href="#" className="underline">privacy policy</a>
              </span>
            </p>
            <Link 
              className="flex btn-primary justify-center"
              href="/orders/123">
              Send order
            </Link>
          </div>
        </div>

      </div>
    </div>
  </div>
  );
}

