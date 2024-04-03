
export default function CommerceLayout({
  children
 }: {
  children: React.ReactNode;
 }) {
   return (
     <main className="flex justify-center"> 
     <div className="w-full sm:w-[350] px-10">
       {children}
     </div>
     </main>
   );
 }