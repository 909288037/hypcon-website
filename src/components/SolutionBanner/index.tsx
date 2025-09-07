import { useImageTransition } from '@/hooks/useImageTransition';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import bgImg from './images/background.png';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import { goPage, preloadImage } from '@/utils';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
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

const datakey = {
  key1: 'zhsn',
  key2: 'gdjt',
  key3: 'zhsw',
  key4: 'zfgj',
  key5: 'zhyy',
  key6: 'zhyq',
  key7: 'zhcg',
  key8: 'dzcf',
};

const SolutionBanner = ({ dataSource }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [slideSwiper, setSlideSwiper] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isStop, setIsStop] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const [startImageUrl, setStartImageUrl] = useState('');
  const [endImageUrl, setEndImageUrl] = useState('');
  const [curImg, setCurImg] = useState('');
  const [endImgInfo, setEndImgInfo] = useState('');
  const productBannerRef = useRef(null);
  const containerRef = useRef(null);
  const imgInfo = useRef({
    w: 0,
    h: 0,
  });
  const curImgInfo = imgConfig[curImg];

  const listMemo = useMemo(() => {
    let data = [];
    dataSource?.forEach((item) => {
      data.push({
        _key: datakey[item.bind],
        ...item,
      });
    });

    setCurImg(data?.[0]?._key);

    return data;
  }, [dataSource]);

  const hotspotMemo = useMemo(() => {
    let data = [];
    listMemo?.forEach((item) => {
      data.push(imgConfig[item._key]);
    });
    return data;
  }, [listMemo]);

  // 存储连接线坐标
  const [connectorPoints, setConnectorPoints] = useState({
    title: { x: 0, y: 0 },
    dot: { x: 0, y: 0 },
  });

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
    duration: 500,
    switchThreshold: 0.9,
  });

  // 计算连接线坐标
  const calculateConnectorPoints = (index) => {
    if (!productBannerRef.current) return;

    // 获取标题元素和热点元素
    const titleEl = document.querySelector(
      `.fl-solution-banner-title-text[data-index="${index}"]`,
    );
    const dotEl = document.querySelector(
      `.fl-solution-banner-hotspot-dot[data-index="${index}"]`,
    );

    if (!titleEl || !dotEl) return;

    // 获取元素在容器中的位置
    const bannerRect = productBannerRef.current.getBoundingClientRect();
    const titleRect = titleEl.getBoundingClientRect();
    const dotRect = dotEl.getBoundingClientRect();

    // 计算相对坐标（相对于容器）
    const titleX = titleRect.left - bannerRect.left + titleRect.width + 100;
    const titleY = titleRect.top - bannerRect.top + titleRect.height / 2;
    const dotX = dotRect.left - bannerRect.left + dotRect.width / 2;
    const dotY = dotRect.top - bannerRect.top + dotRect.height / 2;

    setConnectorPoints({
      title: { x: titleX, y: titleY },
      dot: { x: dotX, y: dotY },
    });
  };

  // 监听元素位置变化，重新计算连接线
  useEffect(() => {
    // 初始计算
    calculateConnectorPoints(currentIndex);

    // 监听窗口大小变化，重新计算
    const handleResize = () => {
      calculateConnectorPoints(currentIndex);
    };

    window.addEventListener('resize', handleResize);

    // 监听轮播变化，重新计算
    const observer = new MutationObserver(() => {
      calculateConnectorPoints(currentIndex);
    });

    if (productBannerRef.current) {
      observer.observe(productBannerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [currentIndex, listMemo]);

  useEffect(() => {
    Object.values(imgConfig).forEach((config) => {
      preloadImage(config.url).catch((err) =>
        console.warn('Failed to preload image:', err),
      );
    });

    return () => {};
  }, []);
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
    if (curImg) {
      getImageDimensions(bgImg).then(({ width, height }) => {
        const clientWidth = document.body.clientWidth;
        let scale = clientWidth / width;
        imgInfo.current = { w: clientWidth, h: scale * height };

        const initialImgKey = curImg;
        const initialImgInfo = imgConfig[initialImgKey];

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
    }
  }, [curImg]);

  useEffect(() => {
    if (endImgInfo) {
      startTransition();
    }
    return () => {};
  }, [endImgInfo]);

  useEffect(() => {
    if (!isAnimating && endPos.x !== 0 && endPos.y !== 0) {
      setStartPos(endPos);
      setStartImageUrl(endImageUrl);
      setCurImg(listMemo?.[currentIndex]?._key);
    }
    return () => {};
  }, [isAnimating, endPos, endImageUrl]);

  useEffect(() => {
    const key = listMemo?.[currentIndex]?._key;
    handleContainerClick(key);
    return () => {};
  }, [currentIndex]);

  const getCurrentWidth = () => {
    if (currentImage === endImageUrl) {
      return endImgInfo?.imgPosition?.width || 0;
    } else {
      return curImgInfo?.imgPosition?.width || 0;
    }
  };

  const handleContainerClick = (endInfo) => {
    if (!endInfo) return;
    const data = imgConfig[endInfo];

    const {
      imgPosition: { x, y },
    } = data;
    const { w, h } = imgInfo.current;

    setEndImageUrl(data.url);
    setEndPos({
      x: w * (x / 100),
      y: h * (y / 100),
    });

    setEndImgInfo(data);
  };

  if (listMemo.length === 0) return null;

  // 生成连接线路径
  const getConnectorPath = () => {
    const { title, dot } = connectorPoints;

    // 如果坐标未初始化，不绘制
    if (title.x === 0 && title.y === 0) return '';

    // 计算水平线段的终点（从标题向右延伸100px）
    const horizontalEndX = title.x + 200;
    const horizontalEndY = title.y;

    // 生成路径：标题 -> 水平100px -> 热点圆点
    return `M ${title.x} ${title.y} L ${horizontalEndX} ${horizontalEndY} L ${dot.x} ${dot.y}`;
  };

  return (
    <div
      ref={productBannerRef}
      className="fl-solution-banner"
      style={{ position: 'relative' }}
    >
      {/* 连接线SVG */}
      <svg
        className="fl-connector-svg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5000,
        }}
      >
        <path
          d={getConnectorPath()}
          stroke="rgba(0, 126, 202, 0.25)"
          strokeWidth="2"
          fill="none"
          // strokeDasharray={isAnimating ? '5,5' : 'none'}
        />
      </svg>

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
        onSwiper={setSlideSwiper}
        onSlideChangeTransitionEnd={(swiper) => {
          setIsStop(false);
          setCurrentIndex(swiper.realIndex);
        }}
        onAutoplayTimeLeft={(swiper, time, progress) => {
          setProgress(Math.round((1 - progress) * 100));
        }}
      >
        {listMemo.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="fl-solution-banner-img">
              <img src={bgImg} alt="背景图" />
              {/* 标题 - 添加data-index用于定位 */}
              <div className="fl-solution-banner-title">
                <div
                  className="fl-solution-banner-title-text"
                  data-index={index}
                >
                  {item.secondTitle}
                  <div className="fl-solution-banner-title-icon">
                    <img src={item.icon} alt="" />
                  </div>
                </div>
                <div className="fl-solution-banner-desc">{item.intro}</div>
                {item?.productList && (
                  <div className="fl-solution-banner-tag">
                    <div className="fl-solution-banner-tag-text">
                      推荐产品：
                    </div>
                    <div className="fl-solution-banner-tag-list">
                      {item?.productList?.map((tag, tagIndex) => (
                        <span
                          className="fl-solution-banner-tag-item"
                          key={tagIndex}
                          onClick={() => {
                            goPage(tag);
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className="custom-primary-btn"
                  onClick={() => {
                    history.push(`/solution/${item.id}`);
                  }}
                >
                  <div className="custom-btn-text">了解更多</div>
                  <div className="custom-btn-arrow"></div>
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
            if (!isStop) {
              slideSwiper?.autoplay.pause();
            } else {
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
          slidesPerView={listMemo?.length || 0}
          watchSlidesProgress
          loop
          onSwiper={setThumbsSwiper}
        >
          <div className="fl-solution-banner-pagination-box">
            {listMemo.map((item, index) => (
              <SwiperSlide key={index} className="fl-solution-banner-slide">
                <div className="fl-solution-banner-title">
                  {item.title}
                  <div className="fl-solution-banner-line"></div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>

      {/* 起点图片 */}
      {startImageUrl && !isAnimating && (
        <img
          className="fl-solution-banner-start-image"
          src={startImageUrl}
          alt="起始图片"
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

      {/* 热区图层 - 为圆点添加data-index用于定位 */}
      <div className="fl-solution-banner-hotspot">
        {hotspotMemo.map((item, index) => (
          <div
            key={item.title}
            className={classNames(
              'fl-solution-banner-hotspot-item',
              item.dotDirection,
              { active: index === currentIndex },
            )}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            onMouseEnter={() => {
              slideSwiper?.autoplay.stop();
              slideSwiper?.slideToLoop(index);
              slideSwiper?.autoplay.start();
            }}
          >
            <div className="fl-solution-banner-hotspot-item-title">
              {item.title}
            </div>
            {/* 圆点 - 添加data-index用于定位 */}
            <div
              className={classNames('fl-solution-banner-hotspot-dot')}
              data-index={index}
            >
              <div className="fl-solution-banner-hotspot-dot-item"></div>
              <div className="fl-solution-banner-hotspot-dot-item"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionBanner;
