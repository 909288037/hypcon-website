import jiantouIcon from '@/assets/images/jiantou.svg';
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import 'swiper/css';
import 'swiper/css/pagination';
import { EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.less';

const ImageSlider = ({ dataSource }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeBtn, setActiveBtn] = useState(-1);

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
      if (
        scrollContainerRef.current.scrollWidth >
        scrollContainerRef.current.clientWidth
      ) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheelScroll, {
        passive: false,
      });
      return () => {
        container.removeEventListener('wheel', handleWheelScroll);
      };
    }
  }, [dataSource]);

  useEffect(() => {
    if (dataSource?.length > 0) {
      setActiveBtn(dataSource[0].id);
    }
  }, [dataSource]);

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
  const imgWidth = document.body.clientWidth * 0.2396;
  const curImgWidth = document.body.clientWidth * 0.4896;

  const _caseList = useMemo(() => {
    let list = [];
    if (dataSource?.length > 0) {
      list = dataSource?.[activeIndex]?.caseList || [];
    }
    if (list.length > 1 && list.length < 4) {
      // 循环添加之前数据
      list = [...list, ...list];
    }
    return list;
  }, [dataSource, activeIndex]);
  console.log('🚀 ~ ImageSlider ~ _caseList:', _caseList);
  if (!dataSource) return null;
  return (
    <div
      className="fl-case-banner"
      style={
        {
          // '--imgWidth': imgWidth + 'px',
          // '--imgHeight': imgWidth * 1.1739 + 'px',
          // '--curImgWidth': curImgWidth + 'px',
        }
      }
    >
      <div className="fl-case-banner-header">
        <div className="fl-case-banner-title">典型案例</div>
        <div className="fl-case-banner-btns" ref={scrollContainerRef}>
          {dataSource?.map((item, index) => (
            <div
              key={item.id}
              className={`fl-case-banner-btn ${activeBtn === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center',
                });
                setActiveBtn(item.id);
                setActiveIndex(index);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      {_caseList?.length > 0 && (
        <Swiper
          className="fl-case-banner-swiper"
          modules={[Pagination, EffectFade]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          // 解决宽度变化导致的错位：每次切换后强制更新
          onSlideChange={() => {}}
          setWrapperSize
          slidesPerView={3}
          spaceBetween={48}
          centeredSlides={false}
          // slideToClickedSlide={true}
          // onSlideChangeTransitionEnd={(swiper) => {
          //   // 幻灯片切换动画结束时，强制更新Swiper以避免宽度计算错误:cite[4]:cite[8]
          //     swiper.update();
          // }}
          allowTouchMove={false}
          pagination={{
            type: 'progressbar',
          }}
          speed={500}
        >
          {_caseList?.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={classNames('fl-case-banner-swiper-item')}
              >
                <div className="fl-case-banner-swiper-img">
                  <img src={item?.image} alt="" />
                </div>
                <div className="fl-case-banner-swiper-content">
                  <div className="fl-case-banner-swiper-content-title">
                    {item?.title}
                  </div>
                 <div className='fl-case-banner-swiper-content-line'></div>
                  <div className="fl-case-banner-swiper-content-desc">
                    <div className="fl-case-banner-swiper-content-desc-text">
                      {item?.intro}
                    </div>
                    <div className="fl-case-banner-swiper-content-desc-tags">
                      <div className="fl-case-banner-swiper-content-desc-tag">
                        <div className="fl-case-banner-swiper-content-desc-tag-num">
                          {item?.res1}
                        </div>
                        <div className="fl-case-banner-swiper-content-desc-tag-text">
                          {item?.res2}
                        </div>
                      </div>

                      <div className="fl-case-banner-swiper-content-desc-tag">
                        <div className="fl-case-banner-swiper-content-desc-tag-num">
                          {item?.res5}
                        </div>
                        <div className="fl-case-banner-swiper-content-desc-tag-text">
                          {item?.res6}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          {_caseList.length > 1 && (
            <div slot="container-start">
              {/* 切换下一张 */}
              <div
                className="swiper-next-btn"
                onClick={() => {
                  // document.querySelector('.fl-case-banner .swiper-slide-active')?.classList.add('fade-out');
                  // document.querySelector('.fl-case-banner .swiper-slide-next')?.classList.add('fade-in');
                  swiperRef.current?.slideNext();
                }}
              >
                <ReactSVG src={jiantouIcon} />
              </div>
            </div>
          )}
        </Swiper>
      )}
    </div>
  );
};

export default ImageSlider;
