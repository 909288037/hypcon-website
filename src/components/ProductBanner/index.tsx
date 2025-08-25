import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import {
  Autoplay,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import './index.less';

const ProductBanner = () => {
  const [list, setList] = useState([
    {
      url: 'https://mate.tools/img/1920x1080?bgcolor=cccccc&textcolor=979797&text=%7Bwidth%7D%C3%97%7Bheight%7D&fmt=png',
      link: 'https://www.baidu.com',
      title: 'FCS100控制系统',
    },
    {
      url: 'https://mate.tools/img/1920x1080?bgcolor=dddddd&textcolor=979797&text=%7Bwidth%7D%C3%97%7Bheight%7D&fmt=png',
      link: 'https://www.baidu.com',
      title: 'DIO128',
    },
    {
      url: 'https://mate.tools/img/1920x1080?bgcolor=dddddd&textcolor=979797&text=%7Bwidth%7D%C3%97%7Bheight%7D&fmt=png',
      link: 'https://www.baidu.com',
      title: 'LFSD照明控制系统',
    },
    {
      url: 'https://mate.tools/img/1920x1080?bgcolor=dddddd&textcolor=979797&text=%7Bwidth%7D%C3%97%7Bheight%7D&fmt=png',
      link: 'https://www.baidu.com',
      title: 'FCS300分布式系统',
    },
    {
      url: 'https://mate.tools/img/1920x1080?bgcolor=dddddd&textcolor=979797&text=%7Bwidth%7D%C3%97%7Bheight%7D&fmt=png',
      link: 'https://www.baidu.com',
      title: '100测试系统',
    },
  ]);
const [currentIndex, setCurrentIndex] = useState(0)
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const productBannerRef = useRef(null);

  return (
    <div ref={productBannerRef} className="fl-product-banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Thumbs]}
        spaceBetween={0}
        slidesPerView={1}
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
            Math.round((1 - progress) * 100) + '%',
          );
        }}
      >
        {list.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="fl-product-banner-img">
              <img src={item.url} alt="" />
              <div
                className="fl-product-banner-link"
                onClick={() => {
                  window.open(item.link);
                }}
              >
                <div className="fl-product-banner-link-text">了解更多</div>
                <div className="fl-product-banner-link-arrow"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
      className='fl-product-banner-pagination'
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          Mousewheel,
          FreeMode,
          Thumbs,
        ]}
        spaceBetween={0}
        slidesPerView={4}
        // mousewheel
        // freeMode
        watchSlidesProgress
        loop
        onSwiper={setThumbsSwiper}
      >
        {list.map((item, index) => (
          <SwiperSlide key={index} className='fl-product-banner-slide'>
            <div className='fl-product-banner-title'>{item.title}</div>
            {/* 进度条 */}
            <div className="fl-product-banner-progress">
              <div
                className={`fl-product-banner-progress-bullet ${
                  currentIndex === index ? 'swiper-pagination-bullet-active' : ''
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
