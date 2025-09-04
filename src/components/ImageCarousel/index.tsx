import { useEffect, useRef } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.less';

// 轮播图数据
const carouselItems = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/id/10/800/1000',
    title: '洛阳大运河博物馆一日游',
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/id/20/800/1000',
    title: '方特元旦跨年一日游',
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/id/30/800/1000',
    title: '泰山攀登一日游',
  },
  {
    id: 4,
    imageUrl: 'https://picsum.photos/id/40/800/1000',
    title: '元旦库年快乐就是一天',
  },
  {
    id: 5,
    imageUrl: 'https://picsum.photos/id/50/800/1000',
    title: '美女美女美女美女',
  },
];

const CircularCarousel = () => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiperInstance = swiperRef.current.swiper;
    // 使用Swiper容器的实际宽度来计算slideW
    let slideW = swiperInstance.width / 3; // 假设我们想显示3张图片，所以除以3

    // 自定义进度效果
    const handleProgress = () => {
      // 定义环绕角度，控制3D效果的强烈程度
      const ANGLE_PER_STEP = 45; // 可调整：30-60 之间效果较好
      // 计算环绕半径
      const radius = slideW / (2 * Math.sin(ANGLE_PER_STEP * Math.PI / 180));

      for (let i = 0; i < swiperInstance.slides.length; i++) {
        const slide = swiperInstance.slides[i];
        const slideProgress = slide.progress;

        const rotateY = slideProgress * ANGLE_PER_STEP;
        const rad = rotateY * Math.PI / 180;

        const translateZ = radius * (1 - Math.cos(rad)) + 'px';
        const translateX = (slideProgress * slideW * 0.5 - Math.sin(rad) * radius) + 'px';

        slide.style.transform = `translateX(${translateX}) translateZ(${translateZ}) rotateY(${rotateY}deg)`;
      }
    };

    const handleSetTransition = (transition) => {
      for (let i = 0; i < swiperInstance.slides.length; i++) {
        swiperInstance.slides[i].style.transition = `${transition}ms`;
      }
    };

    swiperInstance.on('progress', handleProgress);
    swiperInstance.on('setTransition', handleSetTransition);

    // 初始化
    handleProgress();

    return () => {
      swiperInstance.off('progress', handleProgress);
      swiperInstance.off('setTransition', handleSetTransition);
    };
  }, []);

  return (
    <div id="carousel" className="relative w-full max-w-5xl mx-auto">
      <Swiper
        ref={swiperRef}
        className="swiper swiper-3d"
        watchSlidesProgress={true}
        slidesPerView={3} // 显示3张图片
        centeredSlides={true} // 居中显示当前slide
        loop={true}
        grabCursor={true}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: prevRef.current,
          prevEl: nextRef.current,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
        }}
      >
        {carouselItems.map((item) => (
          <SwiperSlide 
            key={item.id} 
            className="swiper-slide" 
            style={{ width: '33.33%' }} // 设置为百分比宽度
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <p>{item.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      <div ref={paginationRef} className="swiper-pagination"></div>
    </div>
  );
};

export default CircularCarousel;