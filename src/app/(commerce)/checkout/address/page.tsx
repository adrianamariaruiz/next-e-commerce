import Title from "@/components/ui/title/Title";
import AddressForm from "./AddressForm";
import { getCountries } from "@/app/actions/country/getCountries";

export default async function AddressPage() {

  const countries = await getCountries();

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full mt-7 xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Address" subtitle="Delivery address" />
        <AddressForm countries={countries}/>
        
      </div>
    </div>
  );
}