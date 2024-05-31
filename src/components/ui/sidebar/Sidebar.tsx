'use client'

import { logOut } from "@/app/actions/logout"
import { useUiStore } from "@/store/ui-store"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoReaderOutline, IoSearchOutline, IoShirtOutline } from "react-icons/io5"

const Sidebar = () => {

  const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen)
  const closeMenu = useUiStore(state => state.closeSideMenu)
  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const roleSession = session?.user.role

  return (
    <div>
      {
        isSideMenuOpen &&
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-50 backdrop-filter backdrop-blur-sm"></div>
          <div
            onClick={closeMenu}
            className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          ></div>
        </>
      }

      <nav className={
        clsx(
          "fixed px-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen
          }
        )
      }>
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        {/* input search */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded px-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-gray-600"
          />
        </div>

        {/* menu */}
        {
          isAuthenticated && (
            <>
              <Link
                href="/profile"
                onClick={() => closeMenu()}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPersonOutline size={30} />
                <span className="ml-3 text-xl">Profile</span>
              </Link>
              <Link
                href="/orders"
                onClick={() => closeMenu()}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoReaderOutline size={30} />
                <span className="ml-3 text-xl">Orders</span>
              </Link>
            </>
          )
        }
        <hr className="mt-5" />
        {
          !isAuthenticated && (
            <Link
              href="/auth/login"
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoLogInOutline size={30} />
              <span className="ml-3 text-xl">Log in</span>
            </Link>
          )
        }

        {
          roleSession === 'admin' && (
            <>
              <Link
                href="/admin/products"
                onClick={() => closeMenu()}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoShirtOutline size={30} />
                <span className="ml-3 text-xl">Products</span>
              </Link>
              <Link
                href="/admin/orders"
                onClick={() => closeMenu()}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoReaderOutline size={30} />
                <span className="ml-3 text-xl">Orders</span>
              </Link>

              <Link
                href="/admin/users"
                onClick={() => closeMenu()}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPeopleOutline size={30} />
                <span className="ml-3 text-xl">Users</span>
              </Link>

            </>
          )
        }

        <hr className="mt-5" />

        {/*LogOut */}
        {
          isAuthenticated && (
            <button
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all w-full"
              onClick={() => logOut()}
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Log out</span>
            </button>
          )
        }

      </nav>

    </div>
  )
}

export default Sidebar