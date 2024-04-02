import Title from "@/components/ui/title/Title";
import clsx from "clsx";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

const orders = [
  {id: 1, name: 'Usagi Tsukino', state: 'Pending to pay', options: 'View order'},
  {id: 2, name: 'Mamoru Chiba', state: 'Paid', options: 'View order'},
  {id: 3, name: 'Chibi Usa', state: 'Paid', options: 'View order'},
]

export default function OrdersPage() {

  return (
    <div>
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
              orders.map((order) => 
                (
                  <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{order.name}</td>
                    <td 
                      className={
                        clsx(
                          "flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap",
                          {
                            'text-red-700': order.state === 'Pending to pay',
                            'text-green-700': order.state === 'Paid',
                          } 
                        )
                      }
                    >
                      <IoCardOutline />
                      <span className='mx-2'>
                        {order.state}
                      </span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 ">
                      <Link href="/orders/123" className="hover:underline">
                        {order.options}
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