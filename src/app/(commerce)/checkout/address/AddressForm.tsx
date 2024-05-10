'use client'

import { deleteUserAddress } from "@/app/actions/address/delete-user-address"
import { setUserAddress } from "@/app/actions/address/set-user-address"
import { Address } from "@/interfaces/address.interface"
import { Country } from "@/interfaces/country.interface"
import { useAddress } from "@/store/address/address-store"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type FormInputs = {
  firstName: string
  lastName: string
  address: string
  address2?: string
  postalCode: string
  city: string
  country: string
  phone: string
  rememberAddress: boolean
}

interface Props {
  countries: Country[];
  userAddressDataBase?: Partial<Address>;
}

const AddressForm = ({countries, userAddressDataBase = {}}: Props) => {

  const router = useRouter();

  const {handleSubmit, register, formState:{isValid}, reset} = useForm<FormInputs>({
    defaultValues: {
      ...userAddressDataBase,
      rememberAddress: true,
    }
  });

  const {data: userSession} = useSession({required: true})

  const setAddress = useAddress(state => state.setAddress)
  const getAddress = useAddress(state => state.address)

  console.log(userSession?.user.id)

  useEffect(() => {
    if(getAddress.firstName){
      reset(getAddress)
    }
  }, [])

  const onSubmit = async(data: FormInputs) => {

    setAddress(data)
    const {rememberAddress, ...restData} = data;
    
    if(rememberAddress){
      await setUserAddress(restData, userSession?.user.id || '')
    }else {
      await deleteUserAddress(userSession?.user.id || '')
    }

    router.push('/checkout')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">

        <div className="flex flex-col mb-2">
          <span>Name</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            {...register("firstName", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Last name</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            {...register("lastName", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Address</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            {...register("address", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Address 2 (optional)</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            {...register("address2")}
          />
        </div>


        <div className="flex flex-col mb-2">
          <span>Postal code</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            {...register("postalCode", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>City</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            {...register("city", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Country</span>
          <select
            className="p-2 border rounded-md bg-gray-100 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            {...register("country", { required: true })}
          >
            <option value="">[ Select ]</option>
            {/* <option value="NY">New York</option> */}
            {
              countries.map(country => (
                <option 
                key={country.id}
                value={country.id}
                >
                  {country.name}
                </option>
              ))
            }
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Phone number</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600"
            {...register("phone", { required: true })}
          />
        </div>

        <div className="inline-flex items-center my-5">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-tangerine-600 checked:bg-tangerine-600 checked:before:bg-tangerine-600 hover:before:opacity-10"
              id="checkbox"
              {...register("rememberAddress")}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span>¿Remember address?</span>
        </div>
      </div>

      <div className="flex flex-col mb-2 mt-5">
        <button
          disabled={!isValid}
          type="submit"
          // className="btn-primary flex w-full sm:w-1/2 justify-center lg:w-1/4"
          className={
            clsx('flex w-full sm:w-1/2 justify-center lg:w-1/4',
              {
              'btn-primary': isValid,
              'btn-disabled': !isValid
            })
          }
        >
          Next
        </button>
      </div>
    </form>
  )
}

export default AddressForm