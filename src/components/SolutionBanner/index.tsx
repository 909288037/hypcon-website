import { useImageTransition } from '@/hooks/useImageTransition';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import bgImg from './images/background.png';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import { preloadImage } from '@/utils';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import classNames from 'classnames';
import {
  Autoplay,
  EffectFade,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import { imgConfig } from './const';
import './index.less';

const SolutionBanner = () => {
  const [list, setList] = useState([
    {
      url: '',
      link: 'https://www.baidu.com',
      groupTitle: '智慧枢纽',
      tag: [
        {
          name: 'EC501 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
        {
          name: 'FCS200',
          link: 'https://www.baidu.com',
        },
        {
          name: '数据采集器',
          link: 'https://www.baidu.com',
        },
      ],
      title: '智慧枢纽解决方案',
      desc: '供需动态平衡，多维协同优化，实现舒适与绿色的完美融合。',
    },
    {
      url: '',
      link: 'https://www.baidu.com',
      groupTitle: '轨道交通',
      tag: [
        {
          name: '轨道交通 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
      ],
      title: '轨道交通解决方案',
      desc: '轨道交通解决方案供需动态平衡，多维协同优化，实现舒适与绿色的完美融合。',
    },
    {
      url: '',
      link: 'https://www.baidu.com',
      groupTitle: '智慧水务',
      tag: [
        {
          name: '智慧水务 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
      ],
      title: '智慧水务解决方案',
      desc: '智慧水务供需动态平衡，多维协同优化，实现舒适与绿色的完美融合。',
    },
    {
      url: '',
      link: 'https://www.baidu.com',
      groupTitle: '政府公建',
      tag: [
        {
          name: '政府公建 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
      ],
      title: '政府公建解决方案',
      desc: '政府公建供需动态平衡，多维协同优化，实现舒适与绿色的完美融合。',
    },
    {
      url: '',
      link: 'https://www.baidu.com',
      groupTitle: '智慧医院',
      tag: [
        {
          name: '智慧医院 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
      ],
      title: '智慧医院解决方案',
      desc: '智慧医院供需动态平衡，多维协同优化，实现舒适与绿色的完美融合。',
    },
    {
      url: '',
      link: 'https://www.baidu.com',
      groupTitle: '智慧园区',
      title: '智慧园区解决方案',
      tag: [
        {
          name: '智慧园区 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
        {
          name: '智慧园区 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
      ],
    },
    {
      url: '',
      link: 'https://www.baidu.com',
      groupTitle: '智慧场馆',
      title: '智慧场馆解决方案',
      tag: [
        {
          name: '智慧场馆 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
        {
          name: '智慧场馆 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
      ],
    },
    {
      url: '',
      link: 'https://www.baidu.com',
      groupTitle: '电子厂房',
      title: '电子厂房解决方案',
      tag: [
        {
          name: '电子厂房 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
        {
          name: '电子厂房 边缘物联控制器',
          link: 'https://www.baidu.com',
        },
      ],
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [slideSwiper, setSlideSwiper] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isStop, setIsStop] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const [startImageUrl, setStartImageUrl] = useState('');
  const [endImageUrl, setEndImageUrl] = useState('');
  const [curImg, setCurImg] = useState('zhsn');
  const [endImgInfo, setEndImgInfo] = useState('');
  const productBannerRef = useRef(null);
  const containerRef = useRef(null);
  const imgInfo = useRef({
    w: 0,
    h: 0,
  });
  const curImgInfo = imgConfig[curImg];
  const {
    position,
    currentImage,
    isAnimating,
    isComplete,
    startTransition,
    scale,
    opacity,
  } = useImageTransition({
    start: startPos,
    end: endPos,
    startImage: startImageUrl,
    endImage: endImageUrl,
    duration: 500, // 动画时长
    switchThreshold: 0.9, // 距离时切换图片
  });
  const getImageDimensions = (
    url: string,
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${url}`));
      };

      img.src = url;
    });
  };
  useEffect(() => {
    // 预加载起始图片
    Object.values(imgConfig).forEach((config) => {
      preloadImage(config.url).catch((err) =>
        console.warn('Failed to preload image:', err),
      );
    });

    getImageDimensions(bgImg).then(({ width, height }) => {
      const clientWidth = document.body.clientWidth;
      let scale = clientWidth / width;
      // 修改这里：使用实际显示宽度而不是原始宽度
      imgInfo.current = { w: clientWidth, h: scale * height };
      console.log('🚀 ~ SolutionBanner ~ imgInfo.current:', imgInfo.current);

      // 获取初始图片信息
      const initialImgKey = Object.keys(imgConfig)[0];
      const initialImgInfo = imgConfig[initialImgKey];

      // 设置初始位置和图片
      setStartPos({
        x: imgInfo.current.w * (initialImgInfo.imgPosition.x / 100),
        y: imgInfo.current.h * (initialImgInfo.imgPosition.y / 100),
      });

      setStartImageUrl(initialImgInfo.url);
      setEndImageUrl(initialImgInfo.url);
      setEndPos({
        x: imgInfo.current.w * (initialImgInfo.imgPosition.x / 100),
        y: imgInfo.current.h * (initialImgInfo.imgPosition.y / 100),
      });
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (endImgInfo) {
      startTransition();
    }

    return () => {};
  }, [endImgInfo]);

  useEffect(() => {
    if (!isAnimating && endPos.x !== 0 && endPos.y !== 0) {
      // 动画结束后更新起始位置和图片
      setStartPos(endPos);
      setStartImageUrl(endImageUrl);
      setCurImg(Object.keys(imgConfig)[currentIndex]);
    }

    return () => {};
  }, [isAnimating, endPos, endImageUrl]);

  useEffect(() => {
    const key = Object.keys(imgConfig)[currentIndex];
    handleContainerClick(key);
    return () => {};
  }, [currentIndex]);

  // 根据当前图片确定宽度
  const getCurrentWidth = () => {
    if (currentImage === endImageUrl) {
      return endImgInfo?.imgPosition?.width || 0;
    } else {
      return curImgInfo?.imgPosition?.width || 0;
    }
  };
  // 处理容器点击，更新起点和终点 (可选，用于演示)
  const handleContainerClick = (endInfo) => {
    if (!endInfo) return;
    const data = imgConfig[endInfo];
    console.log('🚀 ~ handleContainerClick ~ endInfo:', data);

    const {
      imgPosition: { x, y },
    } = data;
    const { w, h } = imgInfo.current;

    // 设置终点信息
    setEndImageUrl(data.url);
    setEndPos({
      x: w * (x / 100),
      y: h * (y / 100),
    });

    // 触发动画
    setEndImgInfo(data);
  };
  return (
    <div
      ref={productBannerRef}
      className="fl-solution-banner"
      // onClick={() => {
      //   handleContainerClick('gdjt');
      // }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Thumbs, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        effect="fade"
        fadeEffect={{
          crossFade: false,
        }}
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
        onSwiper={setSlideSwiper}
        onSlideChangeTransitionEnd={(swiper) => {
          setCurrentIndex(swiper.realIndex);
        }}
        onAutoplayTimeLeft={(swiper, time, progress) => {
          setProgress(Math.round((1 - progress) * 100));
        }}
      >
        {list.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="fl-solution-banner-img">
              <img src={bgImg} alt="" />
              {/* 标题 */}
              <div className="fl-solution-banner-title">
                {item.title}
                {/* 简介 */}
                <div className="fl-solution-banner-desc">{item.desc}</div>
                {/* 推荐产品标签 */}
                <div className="fl-solution-banner-tag">
                  <div className="fl-solution-banner-tag-text">推荐产品：</div>
                  <div className="fl-solution-banner-tag-list">
                    {item.tag.map((tag, index) => (
                      <span className="fl-solution-banner-tag-item" key={index}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="fl-solution-banner-link"
                  onClick={() => {
                    window.open(item.link);
                  }}
                >
                  <div className="fl-solution-banner-link-text">了解更多</div>
                  <div className="fl-solution-banner-link-arrow"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fl-solution-banner-pagination-box">
        <div
          className="fl-solution-banner-pagination-btn"
          onClick={() => {
            // 暂停自动播放
            if (!isStop) {
              slideSwiper?.autoplay.pause();
            } else {
              // 继续自动播放
              slideSwiper?.autoplay.resume();
            }
            setIsStop(!isStop);
          }}
        >
          <Progress
            type="circle"
            percent={progress}
            strokeColor="#007ECA"
            size={66}
            trailColor="#E7E8E9"
            format={() => {
              return isStop ? <CaretRightOutlined /> : <PauseOutlined />;
            }}
          />
        </div>
        <Swiper
          className="fl-solution-banner-pagination"
          modules={[
            Navigation,
            Pagination,
            Autoplay,
            Mousewheel,
            FreeMode,
            Thumbs,
          ]}
          spaceBetween={43}
          slidesPerView={8}
          // mousewheel
          // freeMode
          watchSlidesProgress
          loop
          onSwiper={setThumbsSwiper}
        >
          <div className="fl-solution-banner-pagination-box">
            {list.map((item, index) => (
              <SwiperSlide key={index} className="fl-solution-banner-slide">
                <div className="fl-solution-banner-title">
                  {item.groupTitle}
                  <div className="fl-solution-banner-line"></div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      {/* 起点图片 (固定位置) */}
      {startImageUrl && !isAnimating && (
        <img
          className="fl-solution-banner-start-image"
          src={startImageUrl}
          alt="Start"
          style={{
            position: 'absolute',
            left: `${startPos.x}px`,
            top: `${startPos.y}px`,
            width: curImgInfo?.imgPosition.width,
            height: 'auto',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 移动中的图片 */}
      {isAnimating && (
        <img
          src={currentImage}
          style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: getCurrentWidth(),
            height: 'auto',
            transform: `scale(${scale})`,
            opacity: opacity,
            transition: 'none',
            zIndex: 10,
            willChange: 'left, top, transform, opacity',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 热区图层 */}
      <div className="fl-solution-banner-hotspot">
        {Object.values(imgConfig).map((item, index) => {
          return (
            <div
              key={item.title}
              className={classNames(
                'fl-solution-banner-hotspot-item',
                item.dotDirection,
                {
                  active: index === currentIndex,
                },
              )}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
              onMouseEnter={() => {
                // 轮播图滚动到指定下标
                console.log('🚀 ~ index:', index);
                slideSwiper?.autoplay.stop();

                slideSwiper?.slideToLoop(index);
                slideSwiper?.autoplay.start();
              }}
            >
              <div className="fl-solution-banner-hotspot-item-title">
                {item.title}
              </div>
              {/* 圆点 */}
              <div className={classNames('fl-solution-banner-hotspot-dot')}>
                <div className="fl-solution-banner-hotspot-dot-item"></div>
                <div className="fl-solution-banner-hotspot-dot-item"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SolutionBanner;
