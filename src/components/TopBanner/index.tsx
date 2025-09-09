import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { isImage } from '@/utils';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import './index.less';

const TopBanner = ({ dataSource }) => {
  const homeBannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0)
  const [curTime, setCurTime] = useState(3000)
  console.log("🚀 ~ TopBanner ~ curTime:", curTime)
  const videoRef = useRef({})


  
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
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class=${className}></span>`;
          },
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onAutoplayTimeLeft={(swiper, time, progress) => {
          homeBannerRef.current?.style?.setProperty(
            '--progressWidth',
            Math.min(Math.round((1 - progress) * 100), 100) + '%',
          );
        }}
      >
        {dataSource?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="fl-home-banner-img">
                {isImage(item.image) ? (
                  <img src={item.image} alt="" />
                ) : (
                  <video
                  ref={(ref) => {
                    videoRef.current[index] = ref;
                  } }
                    src={item.image}
                    controls={false}
                    muted
                    autoPlay
                    loop
                    // onLoadedData={(e) => {
                    //   if(activeIndex === index) {
                    //     e.target.currentTime = 0
                    //     setCurTime(Math.ceil(e.target.duration) * 1000)
                    //   }
                    //   console.log("🚀 ~ e:", e)
                    // }}
                  ></video>
                )}
                {
                  <div className="fl-home-banner-title">
                    {item.title}
                    {item.link && (
                      <div
                        className="fl-home-banner-link"
                        onClick={() => {
                          window.open(item.link);
                        }}
                      >
                        <div className="fl-home-banner-link-text">了解更多</div>
                        <div className="fl-home-banner-link-arrow"></div>
                      </div>
                    )}
                  </div>
                }
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TopBanner;
