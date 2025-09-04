import AdvantageBanner from '@/components/AdvantageBanner';
import Header from '@/components/Header';
import { useState } from 'react';
import bannerImg from './images/banner.png';
import './index.less';
import ImageCarousel from '@/components/ImageCarousel';
const Introduction = () => {
  const [zhiList, setZhiList] = useState([{}, {}, {}]);
  return (
    <div className="fl-introduction">
      <Header className="fl-introduction-header" />
      <div className="fl-introduction-banner">
        <img src={bannerImg} alt="" />
        <div className="fl-introduction-banner-title">企业简介</div>
      </div>
      <div className="fl-introduction-advantage">
        <AdvantageBanner />
      </div>
      {/* 智控基因 */}
      <div className="fl-introduction-zhi">
        <div className="fl-introduction-zhi-title">
          <div className="fl-introduction-zhi-title-text">智控基因</div>
          <div className="fl-introduction-zhi-title-desc">
            工业级自控技术基因，20+年智慧城市实战经验， 全场景泛在物联创新能力
          </div>
        </div>
        <div className="fl-introduction-zhi-card">
          <div
            className="fl-introduction-zhi-card-item"
            style={{
              opacity: 0,
            }}
          ></div>
          {zhiList.map((item, index) => {
            return (
              <div className="fl-introduction-zhi-card-item" key={index}>
                <div className="fl-introduction-zhi-card-item-header">
                  <div className="fl-introduction-zhi-card-item-header-text">
                    <div className="fl-introduction-zhi-card-item-header-text-num">
                      {index < 10 ? `0${index + 1}` : index + 1}
                    </div>
                    <div className="fl-introduction-zhi-card-item-header-text-title">
                      <div className="gradient-text">
                        {'起源中控集团'.split('')?.map((t, idx) => {
                          if ('起源中控集团'.length < 8) {
                            if (8 - '起源中控集团'.length === idx + 1) {
                              return (
                                <span key={idx}>
                                  {t}
                                  <br />
                                </span>
                              );
                            }
                          }
                          return <span key={t}>{t}</span>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="fl-introduction-zhi-card-item-header-img">
                    <img src={''} alt="" />
                  </div>
                </div>
                <div className="fl-introduction-zhi-card-item-content">
                  <div className="fl-introduction-zhi-card-item-content-img">
                    <img src={''} alt="" />
                  </div>
                  <div className="fl-introduction-zhi-card-item-content-text">
                    以工业自动化控制技术为核心，奠定深厚技术根基
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 核心技术 */}
      <div className='fl-introduction-coreTechnology'>
        <div className='fl-introduction-coreTechnology-left'>
            <div className='fl-introduction-coreTechnology-title'>
                <div className='fl-introduction-coreTechnology-title-text'>核心技术</div>
                <div className='fl-introduction-coreTechnology-title-desc'>真正的价值源于对核心技术的掌控与突破</div>
            </div>
            <div className='fl-introduction-coreTechnology-list'>
                <div className='fl-introduction-coreTechnology-list-item'>
                    <div className='fl-introduction-coreTechnology-list-item-line'></div>
                    <div className='fl-introduction-coreTechnology-list-item-title'>
                        异构设备互通群控
                    </div>
                    <div className='fl-introduction-coreTechnology-list-item-desc'>
                        基于物联网的强大异构整合能力，兼容100+协议;HypOS统一的数据平台;简洁的组态和配置，支撑快速部署。
                    </div>
                </div>
                 <div className='fl-introduction-coreTechnology-list-item'>
                    <div className='fl-introduction-coreTechnology-list-item-line'></div>
                    <div className='fl-introduction-coreTechnology-list-item-title'>
                        异构设备互通群控
                    </div>
                    <div className='fl-introduction-coreTechnology-list-item-desc'>
                        基于物联网的强大异构整合能力，兼容100+协议;HypOS统一的数据平台;简洁的组态和配置，支撑快速部署。
                    </div>
                </div>
            </div>
        </div>
        <div className='fl-introduction-coreTechnology-right'>
            <img src={""} alt="" />
        </div>
      </div>

      {/* 价值赋能 */}
      <div className='fl-introduction-value'> 
        <div className='fl-introduction-value-title'>
            <div className='fl-introduction-value-title-text'>价值赋能</div>
            <div className='fl-introduction-value-title-desc'>
                <div>累计服务 <span className='gradient-text'>1200+</span> 智慧空间</div>
                <div>智能调控 <span className='gradient-text'>960000+</span> 设备精准运行</div>
            </div>
        </div>
        <ImageCarousel />
      </div>

      {/* 生态合作 */}
      <div className='fl-introduction-ecology'> 
        <div className='fl-introduction-ecology-title'>
            <div className='fl-introduction-ecology-title-text'>生态合作</div>
            <div className='fl-introduction-ecology-title-desc'>
               信任之选，实力见证，携手同行，共创价值
            </div>
        </div>
        <div className='fl-introduction-ecology-list'>
            <div className='fl-introduction-ecology-list-item'>
                <img src={""} alt="" />
            </div>
            <div className='fl-introduction-ecology-list-item'>
                <img src={""} alt="" />
            </div>
            <div className='fl-introduction-ecology-list-item'>
                <img src={""} alt="" />
            </div>
            <div className='fl-introduction-ecology-list-item'>
                <img src={""} alt="" />
            </div>
            <div className='fl-introduction-ecology-list-item'>
                <img src={""} alt="" />
            </div>
            <div className='fl-introduction-ecology-list-item'>
                <img src={""} alt="" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
