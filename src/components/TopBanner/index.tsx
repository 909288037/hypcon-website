import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import './index.less';

const TopBanner = () => {
  const [list, setList] = useState([
    {
      url: '',
      link: 'https://www.baidu.com',
    },
    {
      url: '',
      link: 'https://www.baidu.com',
    },
    {
      url: '',
      link: 'https://www.baidu.com',
    },
    {
      url: '',
      link: 'https://www.baidu.com',
    },
    {
      url: '',
      link: 'https://www.baidu.com',
    },
  ]);
  const homeBannerRef = useRef(null);
  return (
    <div ref={homeBannerRef} className="fl-home-banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class=${className}></span>`;
          },
        }}
        // onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        onAutoplayTimeLeft={(swiper, time, progress) => {
          homeBannerRef.current?.style?.setProperty(
            '--progressWidth',
            Math.round((1 - progress) * 100) + '%',
          );
        }}
      >
        {list.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="fl-home-banner-img">
              <img src={item.url} alt="" />
              <div
                className="fl-home-banner-link"
                onClick={() => {
                  window.open(item.link);
                }}
              >
                <div className="fl-home-banner-link-text">了解更多</div>
                <div className="fl-home-banner-link-arrow"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopBanner;
