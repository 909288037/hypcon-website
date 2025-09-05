import Header from '@/components/Header';
import { useRef, useState } from 'react';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import {
  Autoplay,
  EffectFade,
  Mousewheel,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.less';

import jiantouLeft from '@/assets/images/jiantou-left.png';
import jiantouRight from '@/assets/images/jiantou-right.png';
import { getProductDetail } from '@/services/ProductController';
import { useParams, useRequest } from '@umijs/max';

const ProductDetail: React.FC = () => {
  const params = useParams();
  console.log('🚀 ~ ProductDetail ~ params:', params);
  // 获取产品详情
  const { data: productDetail } = useRequest(() => {
    return getProductDetail(params.type, params.id);
  });
  console.log('🚀 ~ ProductDetail ~ productDetail:', productDetail);
  const [list, setList] = useState([
    {
      url: '',
      title: '设备监控与控制',
      desc: `
            <ul>
                <li>实时采集空调、变配电、电梯等设备的温度、电压、速度等参数，以图表、曲线直观展示。</li>
            </ul>
          `,
    },
    {
      url: '',
      title: '测试数据',
      desc: `
            <ul>
                <li>测试啊</li>
            </ul>
          `,
    },
    {
      url: '',
      title: '设备监控与控制',
      desc: `
            <ul>
                <li>实时采集空调、变配电、电梯等设备的温度、电压、速度等参数，以图表、曲线直观展示。</li>
            </ul>
          `,
    },
    {
      url: '',
      title: '测试数据',
      desc: `
            <ul>
                <li>测试啊</li>
            </ul>
          `,
    },
    {
      url: '',
      title: '设备监控与控制',
      desc: `
            <ul>
                <li>实时采集空调、变配电、电梯等设备的温度、电压、速度等参数，以图表、曲线直观展示。</li>
            </ul>
          `,
    },
    {
      url: '',
      title: '测试数据',
      desc: `
            <ul>
                <li>测试啊</li>
            </ul>
          `,
    },
  ]);

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
            <div className="fl-product-detail-banner-text-desc-item">
              数据采集
            </div>
            <div className="fl-product-detail-banner-text-desc-item">
              数据可视化
            </div>
            <div className="fl-product-detail-banner-text-desc-item">
              数据处理
            </div>
          </div>
        </div>
      </div>
      {/* 简介 */}
      <div className="fl-product-detail-introduction">
        <div className="fl-product-detail-introduction-title">
          <div className="gradient-text">综合楼宇管理平台</div>
        </div>
        <div className="fl-product-detail-introduction-text"></div>
        {/* 功能 */}
        <div className="fl-product-detail-function">
          <div className="fl-product-detail-function-item">
            <div className="fl-product-detail-function-item-icon">
              <img src="" alt="" />
            </div>
            <div className="fl-product-detail-function-item-title">
              智能研判
            </div>
            <div className="fl-product-detail-function-item-desc">
              AI算法 精准决策
            </div>
          </div>
          <div className="fl-product-detail-function-item">
            <div className="fl-product-detail-function-item-icon">
              <img src="" alt="" />
            </div>
            <div className="fl-product-detail-function-item-title">
              智能研判
            </div>
            <div className="fl-product-detail-function-item-desc">
              AI算法 精准决策
            </div>
          </div>
          <div className="fl-product-detail-function-item">
            <div className="fl-product-detail-function-item-icon">
              <img src="" alt="" />
            </div>
            <div className="fl-product-detail-function-item-title">
              智能研判
            </div>
            <div className="fl-product-detail-function-item-desc">
              AI算法 精准决策
            </div>
          </div>
        </div>
      </div>
      {/* 产品特色 */}
      <div className="fl-product-detail-feature">
        <div className="fl-product-detail-feature-title">产品特色</div>
        {/* 标题 */}
        <div className="fl-product-detail-feature-list-title ">
          <div className="gradient-text">四大亮点引领行业创新</div>
        </div>
        <div className="fl-product-detail-feature-list">
          <div className="fl-product-detail-feature-item">
            <div className="fl-product-detail-feature-item-img">
              <img src="" alt="" />
              <div className="fl-product-detail-feature-item-title">
                全场景兼容，打破设备壁垒
              </div>
            </div>
            <div className="fl-product-detail-feature-item-desc">
              HypView
              楼宇自动化监控软件采用协议转换技术和开放API设计，实现多协议支持，支持SECP、
              BACnet、Modbus、KNX、MQTT、OPC UA、Web API
              等主流工业与楼宇协议，能够将不同厂商、不同类型的设备整合在统一平台，消除“数据孤岛”。
              通过构建统一的设备中台，管理者能够在单一界面实现对所有设备的统一监控和管理，大幅提升管理效率。
            </div>
          </div>
          <div className="fl-product-detail-feature-item">
            <div className="fl-product-detail-feature-item-img">
              <img src="" alt="" />
              <div className="fl-product-detail-feature-item-title">
                内置AI算法，实现精准决策
              </div>
            </div>
            <div className="fl-product-detail-feature-item-desc">
              HypView
              楼宇自动化监控软件采用协议转换技术和开放API设计，实现多协议支持，支持SECP、
              BACnet、Modbus、KNX、MQTT、OPC UA、Web API
              等主流工业与楼宇协议，能够将不同厂商、不同类型的设备整合在统一平台，消除“数据孤岛”。
              通过构建统一的设备中台，管理者能够在单一界面实现对所有设备的统一监控和管理，大幅提升管理效率。
            </div>
          </div>
          <div className="fl-product-detail-feature-item">
            <div className="fl-product-detail-feature-item-img">
              <img src="" alt="" />
              <div className="fl-product-detail-feature-item-title">
                内置AI算法，实现精准决策
              </div>
            </div>
            <div className="fl-product-detail-feature-item-desc">
              HypView
              楼宇自动化监控软件采用协议转换技术和开放API设计，实现多协议支持，支持SECP、
              BACnet、Modbus、KNX、MQTT、OPC UA、Web API
              等主流工业与楼宇协议，能够将不同厂商、不同类型的设备整合在统一平台，消除“数据孤岛”。
              通过构建统一的设备中台，管理者能够在单一界面实现对所有设备的统一监控和管理，大幅提升管理效率。
            </div>
          </div>
          <div className="fl-product-detail-feature-item">
            <div className="fl-product-detail-feature-item-img">
              <img src="" alt="" />
              <div className="fl-product-detail-feature-item-title">
                内置AI算法，实现精准决策
              </div>
            </div>
            <div className="fl-product-detail-feature-item-desc">
              HypView
              楼宇自动化监控软件采用协议转换技术和开放API设计，实现多协议支持，支持SECP、
              BACnet、Modbus、KNX、MQTT、OPC UA、Web API
              等主流工业与楼宇协议，能够将不同厂商、不同类型的设备整合在统一平台，消除“数据孤岛”。
              通过构建统一的设备中台，管理者能够在单一界面实现对所有设备的统一监控和管理，大幅提升管理效率。
            </div>
          </div>
        </div>
      </div>
      {/* 核心功能 */}
      <div className="fl-product-detail-core">
        <div className="fl-product-detail-core-title">核心功能</div>
        {/* 标题 */}
        <div className="fl-product-detail-core-title2">
          <div className="gradient-text">全方位覆盖楼宇管理需求</div>
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
            // onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            onAutoplayTimeLeft={(swiper, time, progress) => {
              bannerRef.current?.style?.setProperty(
                '--progressWidth',
                Math.round((1 - progress) * 100) + '%',
              );
            }}
          >
            {list.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="fl-product-detail-banner-box">
                  <div className="fl-product-detail-banner-left">
                    <div className="fl-product-detail-banner-title gradient-text">
                      {item.title}
                    </div>
                    <div
                      className="fl-product-detail-banner-desc"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    ></div>
                  </div>
                  <div className="fl-product-detail-banner-right">
                    <img src={item.url} alt="" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-next">
              <img src={jiantouRight} alt="" />
            </div>
            <div className="swiper-prev">
              <img src={jiantouLeft} alt="" />
            </div>
          </Swiper>
        </div>
      </div>
      {/* 产品优势 */}
      {advantageList.length > 0 && (
        <div className="fl-product-detail-advantage">
          <div className="fl-product-detail-advantage-title">应用价值</div>
          {/* 标题 */}
          <div className="fl-product-detail-advantage-title2">
            <div className="gradient-text">为楼宇管理创造多重效益</div>
          </div>
          <div className="fl-product-detail-advantage-banner">
            <Swiper
              // mousewheel
              loop
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Autoplay, Mousewheel]}
              spaceBetween={150}
              slidesPerView={3}
            >
              {advantageList.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="fl-product-detail-advantage-banner-item">
                      {/* 图标 */}
                      <div className="fl-product-detail-advantage-banner-item-icon">
                        <img src={''} alt="" />
                      </div>
                      <div className="fl-product-detail-advantage-banner-item-title">
                        降低运营成本​
                      </div>
                      <div className="fl-product-detail-advantage-banner-item-desc">
                        ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                        <div className="fl-product-detail-advantage-banner-item-desc-item">
                          在部署方面，HypView采用B/S架构并取得了信创适配认证，支持多类型终端部署，可以节省软件部署和维护费。
                        </div>
                        <div className="fl-product-detail-advantage-banner-item-desc-item">
                          在管理方面，采用设备原型化管理的方式，能够减少人工配置时间，降低管理成本。
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
