import getOrderByUser from "@/app/actions/order/get-orders-by-user";
import Title from "@/components/ui/title/Title";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";


export default async function OrdersPage() {

  const {ok, orders} = await getOrderByUser()

  if(!ok){
    redirect('/auth/login')
  }

  return (
    <div className="mb-10">
      <Title
        title="Orders"
      />

      <div>
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr >
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#ID</th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">State</th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map((order) => 
                (
                  <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id.split('-').at(0)}</td>
                    <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{order.OrderAddress?.firstName} {order.OrderAddress?.lastName}</td>
                    <td className="flex items-center text-sm  text-gray-900 px-6 py-4 whitespace-nowrap">
                      {
                        order.isPaid ? (
                          <>
                            <IoCardOutline className="text-green-700"/>
                            <span className='mx-2 text-green-700'>
                              Paid
                            </span>
                          </>) : (
                            <>
                              <IoCardOutline className="text-red-700"/>
                              <span className='mx-2 text-red-700'>
                                Pending to pay
                              </span>
                            </>
                          )
                        
                      }
                    </td>
                    <td className="text-sm text-gray-900 px-6 ">
                      <Link href={`/orders/${order.id}`} className="hover:underline">
                        view order
                      </Link>
                    </td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>

    </div>
  );
}