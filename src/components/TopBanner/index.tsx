import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import './index.less';

const TopBanner = () => {
  const [list, setList] = useState([
    {
      url: 'https://mate.tools/img/1920x1080?bgcolor=cccccc&textcolor=979797&text=%7Bwidth%7D%C3%97%7Bheight%7D&fmt=png',
      link: 'https://www.baidu.com',
    },
    {
      url: 'https://mate.tools/img/1920x1080?bgcolor=dddddd&textcolor=979797&text=%7Bwidth%7D%C3%97%7Bheight%7D&fmt=png',
      link: 'https://www.baidu.com',
    },
    {
      url: 'https://mate.tools/img/1920x1080?bgcolor=dddddd&textcolor=979797&text=%7Bwidth%7D%C3%97%7Bheight%7D&fmt=png',
      link: 'https://www.baidu.com',
    },
    {
      url: 'https://mate.tools/img/1920x1080?bgcolor=dddddd&textcolor=979797&text=%7Bwidth%7D%C3%97%7Bheight%7D&fmt=png',
      link: 'https://www.baidu.com',
    },
    {
      url: 'https://mate.tools/img/1920x1080?bgcolor=dddddd&textcolor=979797&text=%7Bwidth%7D%C3%97%7Bheight%7D&fmt=png',
      link: 'https://www.baidu.com',
    },
  ]);
  const [progressWidth, setProgressWidth] = useState(0);
  return (
    <div
      className="fl-home-banner"
      style={{
        '--progressWidth': progressWidth,
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
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
          setProgressWidth(Math.round((1 - progress) * 100) + '%');
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
