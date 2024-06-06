import React, { useState, useEffect } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Controller, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/controller';
import 'swiper/css/autoplay';
import Image from 'next/image';
import styles from '@/styles/ImageCarousel.module.css';

// init the swiper 
SwiperCore.use([Navigation, Pagination, EffectFade, Controller, Autoplay]);

const ImageCarousel: React.FC = () => {
  const [titleSwiper, setTitleSwiper] = useState<SwiperCore | null>(null);
  const [imageSwiper, setImageSwiper] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // array to colde the info we using.
  const titles = ['Mint Ice', 'Strawberry Ice', 'Blue Text', 'Orange Text'];
  const subtitles = ['Green Vuse Go Reload 1000', 'Red Vuse Go Reload 1000', 'Blue Vuse Go Reload 1000', 'Orange Vuse Go Reload 1000'];
  const images = ['/green-device.png', '/red-device.png', '/blue-device.png', '/orange-device.png'];
  const circles = ['/green-circle.png', '/red-circle.png', '/blue-circle.png', '/orange-circle.png'];
  const backgrounds = ['/green-bg.jpg', '/red-bg.jpg', '/blue-bg.jpg', '/orange-bg.jpg'];

 // use effect to synch the controls of the title and image 
  useEffect(() => {
    if (titleSwiper && imageSwiper) {
      if (titleSwiper.controller && imageSwiper.controller) {
        titleSwiper.controller.control = imageSwiper;
        imageSwiper.controller.control = titleSwiper;
      }
    }
  }, [titleSwiper, imageSwiper]);

  // use effect to change the background image of the body based on the active slide index
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgrounds[activeIndex]})`;
  }, [activeIndex]);

  return (
    <div className={styles['carousel__container']} style={{ backgroundImage: `url(${backgrounds[activeIndex]})` }}>
      <div className={styles['carousel__text-overlay']}>
        <h1 className={styles['carousel__title']}>{titles[activeIndex]}</h1>
        <h2 className={styles['carousel__subtitle']}>{subtitles[activeIndex]}</h2>
      </div>

      <Swiper
        loop={true}
        slidesPerView={3}
        spaceBetween={-50}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={setImageSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={styles['carousel__swiper']}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Mapping over images array to create Swiper slides */}
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles['carousel__slide']}>
              {/*  rendering of the circle overlay for the based on the active slide */}
            {index === activeIndex && (
              <div className={styles['carousel__circle-overlay']}>
                <Image
                  src={circles[index]}
                  alt={`Circle ${index}`}
                  layout="fill"
                  objectFit="contain"
                  className={styles['carousel__circle']}
                />
              </div>
            )}
             {/* Device image container */}
            <div className={styles['carousel__image-container']}>
              <Image
                src={image}
                alt={`Slide ${index}`}
                layout="fill"
                objectFit="cover"
                className={styles['carousel__device-image']}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
