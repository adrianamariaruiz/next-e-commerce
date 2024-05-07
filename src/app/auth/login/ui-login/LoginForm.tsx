'use client'

import { authenticate } from "@/app/actions/login"
import { useFormState, useFormStatus } from "react-dom"
import Link from "next/link"
import { IoInformationOutline } from "react-icons/io5"
import clsx from "clsx"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"


const LoginForm = () => {

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  useEffect(() => {
    if (errorMessage === 'success') window.location.replace(callbackUrl);
  }, [errorMessage, callbackUrl]);

  return (
    <>
      <form className="space-y-6" action={dispatch}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input type="email" name="email" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-tangerine-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div className="mt-2">
            <input type="password" name="password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-tangerine-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div
          className="flex h-8 items-end space-x-1"
        >
          {
            errorMessage && (
              <>
                <IoInformationOutline className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )
          }
        </div>

        {/* Boton de ingreso */}
        <LoginButton />
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <Link href="/auth/sign-up" className="font-semibold leading-6 text-tangerine-600 hover:text-tangerine-500 px-2">Sign up here</Link>
      </p>
    </>
  )
}

export default LoginForm

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"

      className={
        clsx({
          "btn-primary": !pending,
          "btn-disabled": pending
        })
      }
      disabled={pending}
    >
      Sign in
    </button>
  );
}