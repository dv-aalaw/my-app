import React, { useState, useEffect } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination, EffectFade, Controller, Autoplay} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/controller';
import 'swiper/css/autoplay';
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination, EffectFade, Controller, Autoplay]);

const ImageCarousel: React.FC = () => {
  const [titleSwiper, setTitleSwiper] = useState<SwiperCore | null>(null);
  const [imageSwiper, setImageSwiper] = useState<SwiperCore | null>(null);

  const titles = ['Mint Ice', 'Very Berry', 'SOMETHING ELSE'];
  const images = ['/image1.png', '/image2.png', '/image3.png']; 
  const backgrounds = ['#b0e0e6', '#f08080', '#dda0dd']; 

  useEffect(() => {
    if (titleSwiper && imageSwiper) {
      if (titleSwiper.controller && imageSwiper.controller) {
        titleSwiper.controller.control = imageSwiper;
        imageSwiper.controller.control = titleSwiper;
      }
    }
  }, [titleSwiper, imageSwiper]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100vh' }}>
      <Swiper
        effect="fade"
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={setTitleSwiper}
        controller={{ control: imageSwiper }}
        className="title-swiper"
        style={{ width: '100%', height: '50vh' }}
      >
        {titles.map((title, index) => (
          <SwiperSlide key={index} style={{ backgroundColor: backgrounds[index], display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center', color: '#fff', fontSize: '24px', padding: '20px', transition: 'opacity 0.5s ease-in-out' }}>{title}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        effect="fade"
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={setImageSwiper}
        controller={{ control: titleSwiper }}
        className="image-swiper"
        style={{ width: '100%', height: '50vh' }}
        breakpoints={{
          640: {
            slidesPerView: 1.3,
            centeredSlides: true,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1.5,
            centeredSlides: true,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 20,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} style={{ backgroundColor: backgrounds[index], display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={image}
                alt={`Slide ${index}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
