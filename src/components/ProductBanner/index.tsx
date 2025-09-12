import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import { goPage } from '@/utils';
import {
  Autoplay,
  EffectFade,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import './index.less';
const ProductBanner = ({ dataSource }) => {
  console.log('🚀 ~ ProductBanner ~ dataSource:', dataSource);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const productBannerRef = useRef(null);
  // 跳转页面
  // const goPage = (item: any) => {
  //   console.log('🚀 ~ goPage ~ item:', item);
  //   // 外链
  //   if (item.detailType === '2') {
  //     window.open(item.link);
  //     return;
  //   }
  //   // 跳转软件详情
  //   if (item.type === '0') {
  //     history.push(`/product/${item.id}`);
  //   } else if (item.type === '1') {
  //     // 跳转硬件详情
  //     history.push(`/product-hardware/${item.id}`);
  //   }
  // };
  return (
    <div ref={productBannerRef} className="fl-product-banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Thumbs, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        thumbs={{
          swiper: thumbsSwiper,
        }}
        // pagination={{
        //   clickable: true,
        //   renderBullet: function (index, className) {
        //     return `<span class=${className}></span>`;
        //   },
        // }}
        onSlideChangeTransitionEnd={(swiper) => {
          setCurrentIndex(swiper.realIndex);
        }}
        onAutoplayTimeLeft={(swiper, time, progress) => {
          productBannerRef.current?.style?.setProperty(
            '--progressWidth',
            Math.min(Math.round((1 - progress) * 100), 100) + '%',
          );
        }}
      >
        {dataSource?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="fl-product-banner-img">
              <img src={item.image} alt="" />
              {/* 标题 */}
              <div className="fl-product-banner-title">
                {item.title}
                {/* 简介 */}
                <div className="fl-product-banner-desc">{item.intro}</div>
                <div
                  className="fl-product-banner-link"
                  onClick={() => {
                    goPage(item);
                  }}
                >
                  <div className="fl-product-banner-link-text">了解更多</div>
                  <div className="fl-product-banner-link-arrow"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="fl-product-banner-pagination"
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          Mousewheel,
          FreeMode,
          Thumbs,
        ]}
        slidesPerView={4}
        spaceBetween={0}
        breakpoints={{
          768: {
            slidesPerView:4,
            spaceBetween: 0,
          },
          300: {
            slidesPerView:2,
            spaceBetween: 20,
          },
        }}
        // mousewheel
        // freeMode
        watchSlidesProgress
        loop
        onSwiper={setThumbsSwiper}
      >
        {dataSource?.map((item, index) => (
          <SwiperSlide key={index} className="fl-product-banner-slide">
            <div className="fl-product-banner-title">{item.title}</div>
            {/* 进度条 */}
            <div className="fl-product-banner-progress">
              <div
                className={`fl-product-banner-progress-bullet ${currentIndex === index
                    ? 'swiper-pagination-bullet-active'
                    : ''
                  }`}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductBanner;
