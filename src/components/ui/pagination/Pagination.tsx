'use client'

import generatePagesNumbers from "@/app/utils/generatePagesNumbers";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

const Pagination = ({totalPages}: Props) => {

  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? 1
  let currentPage = isNaN( +pageString ) ? 1 : +pageString /**poner esto: Number(pageString) es lo mismo que esto: +pageString */

  if(currentPage < 1 || isNaN(+pageString)){
    redirect(pathName)
  }

  const allPages = generatePagesNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams( searchParams )

    if(pageNumber === '...'){
      return `${pathName}?${params.toString()}`
    }
    if(Number(pageNumber) <= 0 ){
      return `${pathName}`
    }
    if(Number(pageNumber) > totalPages){
      return `${pathName}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())
    return `${pathName}?${params.toString()}`

  }

  return (
    <>
      <div className="flex text-center justify-center mt-10 mb-32">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item">
              <Link
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href={createPageUrl(currentPage - 1)}><IoChevronBackOutline size={23}/>
              </Link>
            </li>

            {
              allPages.map((page) => (
                <li key={page} className="page-item">
                  <Link
                  className={
                    clsx(
                      'page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                      {
                        'text-white bg-tangerine-600 shadow-md hover:bg-tangerine-500 hover:text-white': page === currentPage
                      }
                    )
                  }
                  href={createPageUrl(page)}>
                    {page}
                  </Link>
                </li>
              ))
            }

            <li className="page-item">
              <Link
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href={createPageUrl(currentPage + 1)}><IoChevronForwardOutline size={23}/>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Pagination