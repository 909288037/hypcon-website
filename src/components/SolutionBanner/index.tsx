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

import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
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
  const productBannerRef = useRef(null);
  const containerRef = useRef(null);
  const imgInfo = useRef({
    w: 0,
    h: 0,
  });
  const curImgInfo = imgConfig[curImg];
  const { position, currentImage, isAnimating, isComplete, startTransition } =
    useImageTransition({
      start: startPos,
      end: endPos,
      startImage: startImageUrl,
      endImage: endImageUrl,
      duration: 1500, // 动画时长 1.5 秒
      switchThreshold: 0.6, // 60% 距离时切换图片
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
    getImageDimensions(bgImg).then(({ width, height }) => {
      imgInfo.current = { w: width, h: height };
      setStartPos({
        x: width * (curImgInfo.x / 100),
        y: height * (curImgInfo.y / 100),
      });
      setStartImageUrl(curImgInfo.url);
    });

    return () => {};
  }, []);

  // 处理容器点击，更新起点和终点 (可选，用于演示)
  const handleContainerClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 点击位置作为新的终点
    setEndPos({ x, y });
  };
  return (
    <div ref={productBannerRef} className="fl-solution-banner">
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
      <img
        className="fl-solution-banner-start-image"
        src={startImageUrl}
        alt="Start"
        style={{
          position: 'absolute',
          left: curImgInfo?.imgPosition?.x + '%', // 减去图片宽度一半 (假设 50x50)
          top: curImgInfo?.imgPosition?.y + '%', // 减去图片高度一半
          width: curImgInfo?.imgPosition.width,
          height: 'auto',
          // pointerEvents: 'none', // 防止遮挡点击事件
          zIndex: 10,
        }}
      />

      {/* 终点图片 (固定位置) */}
      <img
        src={endImageUrl}
        alt="End"
        style={{
          position: 'absolute',
          left: endPos.x - 25,
          top: endPos.y - 25,
          width: '50px',
          height: '50px',
          pointerEvents: 'none',
        }}
      />

      {/* 移动中的图片 */}
      <img
        src={currentImage}
        alt="Moving"
        style={{
          position: 'absolute',
          left: position.x - 25,
          top: position.y - 25,
          width: '50px',
          height: '50px',
          transform: 'translate(0, 0)', // 关键：确保 translate 重置，位置由 left/top 控制
          transition: 'none', // 关闭 CSS transition，由 JS 动画控制
          zIndex: 10, // 置于顶层
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default SolutionBanner;
