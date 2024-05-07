'use client'

import { login } from "@/app/actions/login"
import { registerUser } from "@/app/actions/register"
import clsx from "clsx"
import { useState } from "react"
import { useForm } from "react-hook-form"


type Inputs = {
  name: string
  email: string
  password: string
}

const RegisterForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async(data: Inputs) => {
    setErrorMessage('')
    const { name, email, password } = data;

    // call action
    const res = await registerUser(name, email, password)

    if(!res.ok){
      setErrorMessage(res.message)
      return
    }

    await login(email.toLowerCase(), password)
    window.location.replace('/')
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
          <div className="mt-2">
            <input type="text" required
              className={clsx(
                'block w-full rounded-md border p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tangerine-600 focus:outline-none sm:text-sm sm:leading-6',
                {
                  'border-red-600 ring-red-600 focus:ring-red-600': errors.name
                }
              )}
              autoFocus
              {...register('name', { required: true })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input type="email" required 
              className={clsx(
                'block w-full rounded-md border p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tangerine-600 focus:outline-none sm:text-sm sm:leading-6',
                {
                  'border-red-600 ring-red-600 focus:ring-red-600': errors.email
                }
              )} 
              {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="mt-2">
            <input type="password" required 
              className={clsx(
                'block w-full rounded-md border p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tangerine-600 focus:outline-none sm:text-sm sm:leading-6',
                {
                  'border-red-600 ring-red-600 focus:ring-red-600': errors.email
                }
              )} 
              {...register('password', { required: true, minLength: 6 })}
            />
          </div>
        </div>

        <span className="text-red-600">{errorMessage}</span>

        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-tangerine-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-tangerine-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tangerine-600">Sign up</button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Are a member?
        <a href="/auth/login" className="font-semibold leading-6 text-tangerine-600 hover:text-tangerine-500 px-2">Sign in here</a>
      </p>
    </div>
  )
}

export default RegisterForm