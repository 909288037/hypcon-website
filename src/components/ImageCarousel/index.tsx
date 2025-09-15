import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.less';
function ensureMultipleOfThree(arr) {
    // 创建原数组的副本，避免修改原数组
    let result = [...arr];
    const currentLength = arr.length;

    // 如果数据小于4个，重复添加数据直到总数大于4个
    if (currentLength < 4 && currentLength > 0) {
        // 完整地重复添加整个数组，直到长度大于4
        while (result.length < 4) {
            result = result.concat(arr);
        }
    } else if (currentLength === 0) {
        // 如果数组为空，直接返回空数组
        return result;
    } 
    return result;
}
const CircularCarousel = ({ dataSource }) => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);
  console.log('🚀 ~ CircularCarousel ~ currentIndex:', currentIndex);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  const list = useMemo(() => {
    let data =ensureMultipleOfThree(dataSource || [])
    console.log("🚀 ~ CircularCarousel ~ data:", data)
    return data;
  }, [dataSource]);

  useEffect(() => {
    // 当数据加载完成后再初始化Swiper
    if (!swiperRef.current || list.length === 0) return;

    const swiperInstance = swiperRef.current.swiper;
    console.log('.swiperInstance.slides.length', swiperInstance.slides);

    // 使用Swiper容器的实际宽度来计算slideW
    let slideW = window.innerWidth < 768 ?  swiperInstance.width / 1 : swiperInstance.width / 3; // 假设我们想显示3张图片，所以除以3
    // 自定义进度效果
    const handleProgress = () => {
      // 定义环绕角度，控制3D效果的强烈程度
      if (window.innerWidth > 768) {
        
      const ANGLE_PER_STEP = 45; // 可调整：30-60 之间效果较好
      // 计算环绕半径
      const radius = slideW / (2 * Math.sin((ANGLE_PER_STEP * Math.PI) / 180));

      for (let i = 0; i < swiperInstance.slides.length; i++) {
        const slide = swiperInstance.slides[i];
        // 确保 slideProgress 是一个有效数字，如果不是则默认为0
        const slideProgress =
          typeof slide.progress === 'number' && !isNaN(slide.progress)
            ? slide.progress
            : 0;

        const rotateY = slideProgress * ANGLE_PER_STEP;
        const rad = (rotateY * Math.PI) / 180;

        const translateZ = radius * (1 - Math.cos(rad)) + 'px';
        const translateX =
          slideProgress * slideW * 0.5 - Math.sin(rad) * radius + 'px';

        slide.style.transform = `translateX(${translateX}) translateZ(${translateZ}) rotateY(${rotateY}deg)`;
        }
      }
        
    };
  
    // 组件卸载时移除事件监听器
    const handleSetTransition = (transition) => {
      for (let i = 0; i < swiperInstance.slides.length; i++) {
        swiperInstance.slides[i].style.transition = `${transition}ms`;
      }
    };

    swiperInstance.on('progress', handleProgress);
    swiperInstance.on('setTransition', handleSetTransition);
    swiperInstance.on('slideChangeTransitionStart', (swiper) => {
      setCurrentIndex(swiper.realIndex || 0);
      console.log('🚀 ~ swiper.realIndex:', swiper.realIndex);
    });

    // 初始化
    setTimeout(() => {
      handleProgress();
      setInitialized(true);
    }, 100);

    return () => {
      swiperInstance.off('progress', handleProgress);
      swiperInstance.off('setTransition', handleSetTransition);
    };
  }, [list]);

  // 当list变化时，更新Swiper
  useEffect(() => {
    if (swiperRef.current && initialized && list.length > 0) {
      const swiperInstance = swiperRef.current.swiper;
      // 强制更新Swiper以适应新数据
      setTimeout(() => {
        swiperInstance.update();
        swiperInstance.slideTo(0);
      }, 0);
    }
  }, [list, initialized]);

  if (!list || list.length === 0) {
    return <div className="carousel-placeholder">加载中...</div>;
  }

  return (
    <div id="carousel" className="relative w-full max-w-5xl mx-auto">
      <Swiper
        ref={swiperRef}
        className="swiper swiper-3d"
        watchSlidesProgress={true}
        slidesPerView={window.innerWidth < 768 ? 1 : 3} // 显示3张图片
        centeredSlides={true} // 居中显示当前slide
        loop={true}
       spaceBetween={window.innerWidth < 768 ? 20 : 0}
        grabCursor={true}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // navigation={{
        //   nextEl: prevRef.current,
        //   prevEl: nextRef.current,
        // }}
        // pagination={{
        //   el: paginationRef.current,
        //   clickable: true,
        // }}
      >
        {list?.map((item, index) => (
          <SwiperSlide
            key={item.title}
            className="swiper-slide"
            style={{ width: '33.33%' }} // 设置为百分比宽度
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div
              className={classNames('swiper-slide-title')}
              hidden={currentIndex !== index}
            >
              <div className="gradient-text">{item.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div ref={paginationRef} className="swiper-pagination"></div> */}
    </div>
  );
};

export default CircularCarousel;
