import Footer from "@/components/ui/footer/page";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import TopMenu from "@/components/ui/top-menu/page";

export default function CommerceLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen"> 
    <TopMenu/>
    <Sidebar/>
    <div className="px-2 sm:px-10 my-10">
      {children}
    </div>
    <Footer/>
    </main>
  );
}