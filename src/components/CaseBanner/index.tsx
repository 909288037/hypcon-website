import { useRef, useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { EffectCreative, Pagination,EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.less';
import { Button } from 'antd';
import classNames from 'classnames';
import jiantouIcon from '@/assets/images/jiantou.svg';
import { ReactSVG } from 'react-svg';

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeBtn, setActiveBtn] = useState('智慧枢纽');

  const images = [
    'https://via.placeholder.com/200x300/FF0000/FFFFFF?text=1',
    'https://via.placeholder.com/200x300/00FF00/FFFFFF?text=2',
    'https://via.placeholder.com/200x300/0000FF/FFFFFF?text=3',
    'https://via.placeholder.com/200x300/FFFF00/000000?text=4',
    'https://via.placeholder.com/200x300/FF00FF/FFFFFF?text=5',
  ];

  // 处理鼠标滚轮横向滚动
  const handleWheelScroll = (e: WheelEvent) => {
    if (scrollContainerRef.current) {
      // 只有当容器确实需要横向滚动时才阻止默认行为
      if (scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheelScroll, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheelScroll);
      };
    }
  }, []);

  const buttons = ['智慧枢纽', '轨道交通', '智慧水务', '政府公建', '智慧医院'];
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    
    // 确保轮播图在宽度变化后保持左对齐
    setTimeout(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.update();
      }
    }, 50);
  };
  const imgWidth = document.body.clientWidth * 0.2396
   const curImgWidth = document.body.clientWidth * 0.4896

  return (
    <div className="fl-case-banner" style={{
        '--imgWidth': imgWidth + 'px',
        '--imgHeight': imgWidth * 1.1739 + 'px',
        '--curImgWidth': curImgWidth + 'px',
    }}>
        <div className='fl-case-banner-header'>
            <div className='fl-case-banner-title'>典型案例</div>
            <div 
              className='fl-case-banner-btns' 
              ref={scrollContainerRef}
            >
                {buttons.map((btn) => (
                  <div 
                    key={btn}
                    className={`fl-case-banner-btn ${activeBtn === btn ? 'active' : ''}`}
                    onClick={(e) => {
                        e.currentTarget.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'center'
                        });
                        setActiveBtn(btn);
                    }}
                  >
                    {btn}
                  </div>
                ))}
            </div>
        </div>
      <Swiper
        className="fl-case-banner-swiper"
        modules={[Pagination, EffectFade]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
       
        loop={true}
        // 解决宽度变化导致的错位：每次切换后强制更新
        onSlideChange={() => {
         
        }}
        setWrapperSize
        slidesPerView={3}
        spaceBetween={48}
        centeredSlides={false}
        // slideToClickedSlide={true}
        onSlideChangeTransitionEnd={(swiper) => {
          // 幻灯片切换动画结束时，强制更新Swiper以避免宽度计算错误:cite[4]:cite[8]
        //   swiper.update();

        }}
        allowTouchMove={false}
        pagination={{
          type: 'progressbar',
        }}
        speed={600}
      >
        {images.map((img, index) => {
          return (
            <SwiperSlide
              key={index}
              className={classNames('fl-case-banner-swiper-item')}
            >
             <div className='fl-case-banner-swiper-img'>
                 {index}
             </div>
              {/* <img
              src={img}
              alt={`slide-${index}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            /> */}
            </SwiperSlide>
          );
        })}
        <div slot="container-start">
            {/* 切换下一张 */}
            <div
              className="swiper-next-btn"
              onClick={() => {
                swiperRef.current?.slideNext();
              }}
            >
              <ReactSVG src={jiantouIcon}/>
            </div>
        </div>
      </Swiper>
    </div>
  );
};

export default ImageSlider;