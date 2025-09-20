import Header from '@/components/Header';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import {
  Autoplay,
  EffectFade,
  Mousewheel,
  Navigation,
  Pagination,
  
} from 'swiper/modules';
import {Typography} from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.less';

import jiantouLeft from '@/assets/images/jiantou-left.png';
import jiantouRight from '@/assets/images/jiantou-right.png';
import { getProductDetail } from '@/services/ProductController';
import { useParams, useRequest } from '@umijs/max';
const { Paragraph } = Typography;
const ProductDetail: React.FC = () => {
  const params = useParams();
  const swiperRef = useRef(null);
  console.log('🚀 ~ ProductDetail ~ params:', params);
  // 获取产品详情
  const { data: productDetail, run } = useRequest(getProductDetail, {
    manual: true,
  });
  useEffect(() => {
    run(params.type, params.id);
  }, [params.id]);

  // 产品价值列表
  const [advantageList, setAdvantageList] = useState(['', '', '', '']);
  const bannerRef = useRef(null);
  return (
    <div className="fl-product-detail">
      <Header className="fl-product-detail-header" />
      <div className="fl-product-detail-banner">
        <div className="fl-product-detail-banner-img">
          <img src={productDetail?.image} alt="" />
        </div>
        <div className="fl-product-detail-banner-text">
          <div className="fl-product-detail-banner-text-title">
            {productDetail?.name}
          </div>
          <div className="fl-product-detail-banner-text-desc">
            <div className="fl-product-detail-banner-text-desc-item ">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: productDetail?.description,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* 简介 */}
      {productDetail?.intro && (
        <div className="fl-product-detail-introduction">
          <div className="fl-product-detail-introduction-title">
            <div className="gradient-text">{productDetail?.intro?.title}</div>
          </div>
          <div className="fl-product-detail-introduction-text ">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: productDetail?.intro?.detail,
              }}
            ></div>
          </div>
          {/* 功能 */}
          <div className="fl-product-detail-function">
            {productDetail?.traitList?.map((item, index) => {
              return (
                <div className="fl-product-detail-function-item" key={index}>
                  <div className="fl-product-detail-function-item-icon">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="fl-product-detail-function-item-title">
                    {item.title}
                  </div>
                  <Paragraph ellipsis={{ rows: 2 }}>
                    <div className="fl-product-detail-function-item-desc">
                      {item.second}
                    </div>
                  </Paragraph>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* 产品特色 */}
      {productDetail?.feature && (
        <div className="fl-product-detail-feature">
          <div className="fl-product-detail-feature-title">{productDetail?.feature?.second}</div>
          {/* 标题 */}
          <div className="fl-product-detail-feature-list-title ">
            <div className="gradient-text">{productDetail?.feature?.title}</div>
          </div>
          <div className="fl-product-detail-feature-list">
            {productDetail?.feature?.detail?.map((item, index) => (
              <div className="fl-product-detail-feature-item" key={index}>
                <div className="fl-product-detail-feature-item-img">
                  <img src={item.image} alt="" />
                  <div className="fl-product-detail-feature-item-title">
                    {item.title}
                  </div>
                </div>
                <div className="fl-product-detail-feature-item-desc ">
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: item.intro,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 核心功能 */}
      {productDetail?.function && (
        <div className="fl-product-detail-core">
          <div className="fl-product-detail-core-title">{productDetail?.function?.second}</div>
          {/* 标题 */}
          <div className="fl-product-detail-core-title2">
            <div className="gradient-text">
              {productDetail?.function?.title}
            </div>
          </div>
          {/* 轮播图 */}
          <div className="fl-product-detail-core-banner" ref={bannerRef}>
            <Swiper
              className="fl-product-detail-banner-swiper"
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={0}
              slidesPerView={1}
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              }}
              autoplay={{
                delay: 6000,
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
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onAutoplayTimeLeft={(swiper, time, progress) => {
                bannerRef.current?.style?.setProperty(
                  '--progressWidth',
                  Math.round((1 - progress) * 100) + '%',
                );
              }}
            >
              {productDetail?.function?.detail?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="fl-product-detail-banner-box">
                    <div className="fl-product-detail-banner-left">
                      <div className="fl-product-detail-banner-title gradient-text">
                        {item.title}
                      </div>
                      <div className="fl-product-detail-banner-desc ">
                        <div
                          className="ql-editor"
                          dangerouslySetInnerHTML={{ __html: item.intro }}
                        ></div>
                      </div>
                    </div>
                    <div className="fl-product-detail-banner-right">
                      <img src={item.image} alt="" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {productDetail?.function?.detail?.length > 1 && (
                <>
                  <div
                    className="swiper-next"
                    onClick={() => swiperRef.current.slideNext()}
                  >
                    <img src={jiantouRight} alt="" />
                  </div>
                  <div
                    className="swiper-prev"
                    onClick={() => swiperRef.current.slidePrev()}
                  >
                    <img src={jiantouLeft} alt="" />
                  </div>
                </>
              )}
            </Swiper>
          </div>
        </div>
      )}
      {/* 产品优势 */}
      {productDetail?.value && (
        <div className="fl-product-detail-advantage">
          <div className="fl-product-detail-advantage-title">{productDetail?.value?.second}</div>
          {/* 标题 */}
          <div className="fl-product-detail-advantage-title2">
            <div className="gradient-text">{productDetail?.value?.title}</div>
          </div>
          <div className="fl-product-detail-advantage-banner">
            {productDetail?.value?.detail?.length < 3 ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 100,
                }}
              >
                {productDetail?.value?.detail.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="fl-product-detail-advantage-banner-item">
                        {/* 图标 */}
                        <div className="fl-product-detail-advantage-banner-item-icon">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="fl-product-detail-advantage-banner-item-title">
                          {item.item}
                        </div>
                        <div className="fl-product-detail-advantage-banner-item-desc">
                          ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                          <div className="fl-product-detail-advantage-banner-item-desc-item ">
                            <div
                              className="ql-editor"
                              dangerouslySetInnerHTML={{
                                __html: item.intro,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Swiper
                // mousewheel
                loop
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Mousewheel]}
                spaceBetween={100}
                  slidesPerView={3}
                  breakpoints={{
                    200: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                  
                  }}
              >
                {productDetail?.value?.detail.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="fl-product-detail-advantage-banner-item">
                        {/* 图标 */}
                        <div className="fl-product-detail-advantage-banner-item-icon">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="fl-product-detail-advantage-banner-item-title">
                          {item.item}
                        </div>
                        <div className="fl-product-detail-advantage-banner-item-desc">
                          ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                          <div className="fl-product-detail-advantage-banner-item-desc-item ">
                            <div
                              className="ql-editor"
                              dangerouslySetInnerHTML={{
                                __html: item.intro,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
