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
import ProductImage from './product-image/ProductImage';

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
            images.map((image, index) => (
              <SwiperSlide key={index}>
                <ProductImage 
                  src={image}
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
          images.length === 0 
          ? <ProductImage
          width={ 300 }
          height={ 300 }
          src={ '' }
          alt={ title }
          className="rounded-lg object-fill"
        />
        :
          images.map( image => (
            <SwiperSlide key={ image }>
              <ProductImage
                width={ 300 }
                height={ 300 }
                src={ image }
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