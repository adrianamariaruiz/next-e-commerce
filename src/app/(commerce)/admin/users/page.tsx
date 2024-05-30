import { getPaginatedOrders } from "@/app/actions/order/get-paginated-orders";
import Title from "@/components/ui/title/Title";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import UsersTable from "./components/UsersTable";
import { getPaginatedUsers } from "@/app/actions/users/get-paginated-users";
import Pagination from "@/components/ui/pagination/Pagination";


export default async function UsersPage() {

  // const {ok, orders} = await getPaginatedOrders()
  const {ok, users = []} = await getPaginatedUsers()

  if(!ok){
    redirect('/auth/login')
  }

  return (
    <div className="mb-10">
      <Title
        title="User maintenance"
      />

      <div>
        <UsersTable users={users}/>
      </div>

      <Pagination totalPages={3} />

    </div>
  );
}