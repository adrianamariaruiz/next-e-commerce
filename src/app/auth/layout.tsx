import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


export default async function CommerceLayout({
  children
 }: {
  children: React.ReactNode;
 }) {

  const session = await auth();
  // console.log({session})

  // si el usuario ya está autenticado lo redirige a la tienda, no lo deja volver al login porque ya está logeado
  if(session?.user){
    redirect('/')
  }

   return (
     <main className="flex justify-center"> 
     <div className="w-full sm:w-[350] px-10">
       {children}
     </div>
     </main>
   );
 }