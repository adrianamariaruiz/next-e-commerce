import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

export default function EmpyCartPage() {

  // redirect('/empty-cart')

  return (
    <div className="flex flex-col justify-center items-center py-44 ">
      <h1 className="font-bold text-2xl py-5">Your cart is empty</h1>
      <IoCartOutline size={80} className="mx-5"/>
      <Link href={'/'} className="hover:underline pt-5 text-xl font-bold text-tangerine-600">Back to commerce</Link>
    </div>
  );
}