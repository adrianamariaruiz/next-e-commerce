import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import { IoCartOutline, IoSearch, IoSearchOutline } from 'react-icons/io5'

const TopMenu = () => {
  return (
    <nav className='flex px-5 justify-between items-center w-full border border-gray-400'>
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>E-Commerce</span>
        </Link>
      </div>
      <div className='hidden sm:flex'>
        <Link className='m-2 p-2 transition-all hover:bg-gray-200' href="/category/men">Hombres</Link>
        <Link className='m-2 p-2 transition-all hover:bg-gray-200' href="/category/women">Mujeres</Link>
        <Link className='m-2 p-2 transition-all hover:bg-gray-200' href="/category/kids">Niños</Link>
      </div>

      <div className='flex items-center gap-2'>
        <Link href="/search">
          <IoSearch className='w-5 h-5'/>
        </Link>
        <Link href="/cart">
          <div className='relative'>
            <span className='absolute -top-2 -right-2 px-1 text-xs rounded-full bg-blue-700 font-bold text-white'>3</span>
            <IoCartOutline className='w-5 h-5'/>
          </div>
        </Link>
        <button className='m-2 p-2 rounded-md transition-all hover:bg-gray-200'>Menú</button>
      </div>

    </nav>
  )
}

export default TopMenu