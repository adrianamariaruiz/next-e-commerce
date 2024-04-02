'use client'

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slideshow.css';

interface Props {
  images: string[]
  title: string
  className?: string
}

const ProductMobileSlideShow = ({images, title, className}:Props) => {

  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100%',
          height: '500px',
        }}
        pagination
        // autoplay={{
        //   delay: 2500
        // }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
          {
            images.map((imgage, index) => (
              <SwiperSlide key={index}>
                <Image 
                  src={`/products/${imgage}`}
                  alt={title}
                  width={600}
                  height={500}
                  className='object-fill'
                />
              </SwiperSlide>
            ))
          }
      </Swiper>
    </div>
  )
}

export default ProductMobileSlideShow