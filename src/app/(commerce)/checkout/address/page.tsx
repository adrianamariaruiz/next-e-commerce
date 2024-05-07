import Title from "@/components/ui/title/Title";
import Link from "next/link";

export default function AddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Address" subtitle="Delivery address" />

        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">

          <div className="flex flex-col mb-2">
            <span>Name</span>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Last name</span>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address</span>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address 2 (optional)</span>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            />
          </div>


          <div className="flex flex-col mb-2">
            <span>Postal code</span>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>City</span>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Country</span>
            <select 
              className="p-2 border rounded-md bg-gray-200 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            >
              <option value="">[ Select ]</option>
              <option value="NY">New York</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Phone number</span>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            />
          </div>



          <div className="flex flex-col mb-2 sm:mt-10">
            <Link 
              href='/checkout'
              className="btn-primary flex w-full sm:w-1/2 justify-center ">
              Next
            </Link>
          </div>


        </div>

      </div>




    </div>
  );
}