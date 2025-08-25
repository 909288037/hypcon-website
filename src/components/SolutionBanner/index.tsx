import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

import {
  Autoplay,
  EffectFade,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import './index.less';
import { Progress } from 'antd';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';

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
  const [slideSwiper, setSlideSwiper] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isStop, setIsStop] = useState(false)
  const productBannerRef = useRef(null);

  return (
    <div ref={productBannerRef} className="fl-solution-banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Thumbs, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        effect="fade"
        fadeEffect={{
          crossFade: true
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
         
          setProgress(Math.round((1 - progress) * 100))
        }}
      >
        {list.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="fl-solution-banner-img">
              <img src={item.url} alt="" />
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
        <div className="fl-solution-banner-pagination-btn" onClick={() => {
          // 暂停自动播放
          if(!isStop) {
          slideSwiper?.autoplay.pause();
          } else {
            // 继续自动播放
            slideSwiper?.autoplay.resume();
          }
          setIsStop(!isStop);
        }}>
          <Progress type="circle" percent={progress} strokeColor="#007ECA" size={66} trailColor="#E7E8E9" format={() => {
            return isStop ? <CaretRightOutlined /> : <PauseOutlined />
          }}/>
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
                  <div className='fl-solution-banner-line'></div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default SolutionBanner;
