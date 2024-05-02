'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { titleFont } from '@/config/fonts'
import { IoCartOutline, IoSearch } from 'react-icons/io5'
import { useCartStore } from '@/store/cart/cart-store'
import { useUiStore } from '@/store/ui-store'

const TopMenu = () => {

  const openMenu = useUiStore(state => state.openSideMenu)
  const totalCartItems = useCartStore( state => state.getTotalItems() )

  const [ready, setReady] = useState(false)

  useEffect( () => {
    setReady(true)
  }, [] )

  return (
    <nav className='flex px-5 justify-between items-center w-full shadow-md'>
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>E-Commerce</span>
        </Link>
      </div>
      <div className='hidden sm:flex'>
        <Link className='m-2 p-2 transition-all rounded-md hover:bg-gray-200' href="/gender/men">Men</Link>
        <Link className='m-2 p-2 transition-all rounded-md hover:bg-gray-200' href="/gender/women">Women</Link>
        <Link className='m-2 p-2 transition-all rounded-md hover:bg-gray-200' href="/gender/kid">Kids</Link>
      </div>

      <div className='flex items-center gap-2'>
        <Link href="/search">
          <IoSearch className='w-5 h-5'/>
        </Link>
        <Link href={(totalCartItems === 0 && ready) ? "/empty-cart" : "/cart"}>
          <div className='relative'>
            {
              (ready && totalCartItems > 0) && (
                <span 
                  className='fade-in absolute -top-2 -right-2 px-1 text-xs rounded-full bg-blue-700 font-bold text-white'
                >
                  {totalCartItems}
                </span>
              )
            }
            <IoCartOutline className='w-5 h-5'/>
          </div>
        </Link>
        <button 
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-200'
          onClick={() => openMenu()}
        >Menu</button>
      </div>

    </nav>
  )
}

export default TopMenu