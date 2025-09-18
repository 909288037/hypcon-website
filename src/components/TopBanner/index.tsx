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
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0); // 新增：记录上一个索引
  const videoRef = useRef({});
  const swiperRef = useRef(null);
  const curDuration = useRef({}); // 修改：用对象存储每个视频的时长
  const isVideoPlaying = useRef(false);

  // 当活动索引变化时处理
  useEffect(() => {
    const currentItem = dataSource?.[activeIndex];
    if (!currentItem) return;

    // 重置上一个视频（如果是视频的话）
    if (prevIndex !== activeIndex && videoRef.current[prevIndex]) {
      const prevVideo = videoRef.current[prevIndex];
      if (!isImage(dataSource[prevIndex]?.image)) {
        prevVideo.pause();
        prevVideo.currentTime = 0; // 重置视频进度
      }
    }

    // 处理当前项
    if (!isImage(currentItem.image)) {
      swiperRef.current?.autoplay.stop();
      isVideoPlaying.current = true;
      // 播放当前视频
      if (videoRef.current[activeIndex]) {
        videoRef.current[activeIndex].play();
      }
    } else {
      isVideoPlaying.current = false;
      swiperRef.current?.autoplay.start();
    }

    // 更新上一个索引
    setPrevIndex(activeIndex);
  }, [activeIndex, dataSource, prevIndex]);

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
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onAutoplayTimeLeft={(swiper, time, progress) => {
          // 只有在非视频播放状态下才更新进度条
          if (!isVideoPlaying.current) {
            homeBannerRef.current?.style?.setProperty(
              '--progressWidth',
              Math.min(Math.round((1 - progress) * 100), 100) + '%',
            );
          }
        }}
      >
        {dataSource?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="fl-home-banner-img">
                {isImage(item.image) ? (
                  <div>
                    <img src={item.image} alt={item.title || "轮播图片"} className='pc-block'/>
                    <img src={item.imageMobile} alt={item.title || "轮播图片"} className='mb-block' />
                  </div>
                ) : (
                  <video
                    ref={(ref) => {
                      videoRef.current[index] = ref;
                    }}
                    src={item.image}
                    controls={false}
                    muted
                    loop={false}
                    playsInline
                    onLoadedData={(e) => {
                      // 用索引区分存储每个视频的时长
                      curDuration.current[index] = e.target.duration || 0;
                      if (activeIndex === index) {
                        e.target.play();
                      }
                    }}
                    onTimeUpdate={(e) => {
                      // 使用当前索引获取对应视频的时长
                      if (curDuration.current[index] > 0) {
                        const progress = Math.round(
                          (e.target.currentTime / curDuration.current[index]) *
                            100,
                        );
                        homeBannerRef.current?.style?.setProperty(
                          '--progressWidth',
                          progress + '%',
                        );
                      }
                    }}
                    onEnded={() => {
                      isVideoPlaying.current = false;
                      swiperRef.current?.slideNext();
                      swiperRef.current?.autoplay.start();
                    }}
                  ></video>
                )}
                <div className="fl-home-banner-title">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.title?.replace(/\<br\>/, '<br/>'),
                    }}
                  ></div>
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
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TopBanner;
