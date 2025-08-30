import Header from '@/components/Header';
import { useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.less';

const ProductDetail: React.FC = () => {
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
  ]);
  const bannerRef = useRef(null);
  return (
    <div className="fl-product-detail">
      <Header className="fl-product-detail-header" />
      <div className="fl-product-detail-banner">
        <div className="fl-product-detail-banner-img">
          <img src="" alt="" />
        </div>
        <div className="fl-product-detail-banner-text">
          <div className="fl-product-detail-banner-text-title">
            HypView监控软件
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
        <div className="fl-product-detail-core-banner">
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
                <div className='fl-product-detail-banner-box'>
                    <div className='fl-product-detail-banner-left'>
                        <div>{item.title}</div>
                        <div dangerouslySetInnerHTML={{__html: item.desc}}></div>
                    </div>
                    <div className='fl-product-detail-banner-right'>
                        <img src={item.url} alt="" />
                    </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
