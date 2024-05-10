import Title from "@/components/ui/title/Title";
import AddressForm from "./AddressForm";
import { getCountries } from "@/app/actions/country/getCountries";
import { auth } from "@/auth.config";
import { getUserAddress } from "@/app/actions/address/get-user-address";

export default async function AddressPage() {

  const countries = await getCountries();
  const session = await auth()

  if(!session?.user){
    return (
      <h3 className="text-2xl">500 - There is no user session</h3>
    )
  }

  const getUserAddressDB = await getUserAddress(session.user.id) ?? undefined;

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full mt-7 xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Address" subtitle="Delivery address" />
        <AddressForm countries={countries} userAddressDataBase={getUserAddressDB}/>
        
      </div>
    </div>
  );
}