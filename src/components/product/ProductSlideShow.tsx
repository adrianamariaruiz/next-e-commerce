'use client'

import {Swiper as SwiperObject} from 'swiper'
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css';

import Image from 'next/image';

interface Props {
  images: string[]
  title: string
  className?: string
}

const ProductSlideShow = ({images, title, className}:Props) => {
  
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#f18a00',
          '--swiper-pagination-color': '#f18a00',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        // autoplay={{
        //   delay: 2500
        // }}
        thumbs={{ 
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
          {
            images.map((imgage, index) => (
              <SwiperSlide key={index}>
                <Image 
                  src={`/products/${imgage}`}
                  alt={title}
                  width={1024}
                  height={800}
                  className='rounded-lg object-fill'
                />
              </SwiperSlide>
            ))
          }
      </Swiper>

      <Swiper
        onSwiper={ setThumbsSwiper }
        spaceBetween={ 10 }
        slidesPerView={ 4 }
        freeMode={ true }
        watchSlidesProgress={ true }
        modules={ [ FreeMode, Navigation, Thumbs ] }
        className="mySwiper"
      >
        {
          images.map( image => (
            <SwiperSlide key={ image }>
              <Image
                width={ 300 }
                height={ 300 }
                src={ `/products/${ image }` }
                alt={ title }
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ) )
        }
      </Swiper>

    </div>
  )
}

export default ProductSlideShow