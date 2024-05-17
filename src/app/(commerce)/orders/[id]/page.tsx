import { getOrderById } from "@/app/actions/order/get-order-by-id";
import Title from "@/components/ui/title/Title";
import Image from "next/image";
import { redirect } from "next/navigation";
import PaidOrder from "../components/PaidOrder";
import currentFormat from "@/app/utils/currentFormat";

interface Props {
  params: {
    id: string
  }
}

export default async function OrderPage({ params }: Props) {

  const { id } = params

  // call server action
  const { ok, order, orderItems } = await getOrderById(id)

  const addressFromDB = order!.OrderAddress

  if (!ok) {
    redirect('/')
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title
          title={`Order #${id.split('-').at(0)}`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* cart */}
          <div className="flex flex-col mt-5">
            <PaidOrder paid={order!.isPaid} />


            {/* items */}
            {
              orderItems?.map(item => (
                <div key={item.id} className="flex mb-5">
                  <Image
                    src={`/products/${item.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    alt={item.product.title}
                    className="mr-5 rounded"
                  />
                  <div>
                    <p>{item.product.title}</p>
                    <p>${item.price} x {item.quantity}</p>
                    <p className="font-bold">Subtotal: {currentFormat(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-semibold">Delivery address</h2>
            <div className="mb-5">
              <p className="text-xl">{addressFromDB?.firstName} {addressFromDB?.lastName}</p>
              <p>{addressFromDB?.address}</p>
              <p>{addressFromDB?.address2}</p>
              <p>{addressFromDB?.postalCode}</p>
              <p>{addressFromDB?.city} - {addressFromDB?.countryId}</p>
              <p>{addressFromDB?.phone}</p>
            </div>

            <hr />

            <h2 className="text-2xl my-4">Checkout</h2>
            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">{order?.itemsInOrder}</span>
              <span>subtotal</span>
              <span className="text-right">{currentFormat(order?.subTotal || 0)}</span>
              <span>Taxes (15%)</span>
              <span className="text-right">{currentFormat(order?.tax || 0)}</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{currentFormat(order?.total || 0)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <PaidOrder paid={order!.isPaid} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

