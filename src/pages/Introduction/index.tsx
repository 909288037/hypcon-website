import AdvantageBanner from '@/components/AdvantageBanner';
import Header from '@/components/Header';
import ImageCarousel from '@/components/ImageCarousel';
import { getAbout } from '@/services/AboutNetwork';
import { useRequest } from '@umijs/max';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import bannerImg from './images/banner.png';
import './index.less';
const Introduction = () => {
  const [hoverIndex, setHoverIndex] = useState(0);
  // 获取企业简介数据
  const {
    data: aboutData,
    error,
    loading,
  } = useRequest(() => {
    return getAbout();
  });

  useEffect(() => {
    return () => {};
  }, [aboutData]);

  return (
    <div className="fl-introduction">
      <Header className="fl-introduction-header" />
      <div className="fl-introduction-banner">
        <img src={bannerImg} alt="" />
        <div className="fl-introduction-banner-title">{aboutData?.title}</div>
      </div>
      <div className="fl-introduction-advantage">
        <AdvantageBanner dataSource={aboutData?.intro} />
      </div>
      {/* 智控基因 */}
      <div className="fl-introduction-zhi">
        <div className="fl-introduction-zhi-title">
          <div className="fl-introduction-zhi-title-text">
            {aboutData?.gene?.title}
          </div>
          <div className="fl-introduction-zhi-title-desc">
            {aboutData?.gene?.second}
          </div>
        </div>
        <div className="fl-introduction-zhi-card">
          <div
            className="fl-introduction-zhi-card-item"
            style={{
              opacity: 0,
            }}
          ></div>
          {aboutData?.gene?.details?.map((item, index) => {
            return (
              <div className="fl-introduction-zhi-card-item" key={index}>
                <div className="fl-introduction-zhi-card-item-header">
                  <div className="fl-introduction-zhi-card-item-header-text">
                    <div className="fl-introduction-zhi-card-item-header-text-num">
                      {index < 10 ? `0${index + 1}` : index + 1}
                    </div>
                    <div className="fl-introduction-zhi-card-item-header-text-title">
                      <div className="gradient-text">
                        {item.title.split('')?.map((t, idx) => {
                          if (item.title.length < 8) {
                            if (8 - item.title.length === idx + 1) {
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
                    <img src={item.image} alt="" />
                  </div>
                </div>
                <div className="fl-introduction-zhi-card-item-content">
                  <div className="fl-introduction-zhi-card-item-content-img">
                    <img src={item.imageMobile} alt="" />
                  </div>
                  <div
                    className="fl-introduction-zhi-card-item-content-text"
                    dangerouslySetInnerHTML={{
                      __html: item.intro,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 核心技术 */}
      <div className="fl-introduction-coreTechnology">
        <div className="fl-introduction-coreTechnology-left">
          <div className="fl-introduction-coreTechnology-title">
            <div className="fl-introduction-coreTechnology-title-text">
              {aboutData?.technology?.title}
            </div>
            <div className="fl-introduction-coreTechnology-title-desc">
              {aboutData?.technology?.second}
            </div>
          </div>
          <div className="fl-introduction-coreTechnology-list">
            {aboutData?.technology?.details?.map((item, index) => (
              <div
                className={classNames(
                  'fl-introduction-coreTechnology-list-item',
                  {
                    'fl-introduction-coreTechnology-list-item-active':
                      index === hoverIndex,
                  },
                )}
                key={index}
                onMouseEnter={() => {
                  setHoverIndex(index);
                }}
              >
                <div className="fl-introduction-coreTechnology-list-item-line"></div>
                <div className="fl-introduction-coreTechnology-list-item-title">
                  {item.title}
                </div>
                <div className="fl-introduction-coreTechnology-list-item-desc">
                  {item.intro}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fl-introduction-coreTechnology-right">
          <img
            src={aboutData?.technology?.details?.[hoverIndex]?.image}
            alt=""
          />
        </div>
      </div>

      {/* 价值赋能 */}
      <div className="fl-introduction-value">
        <div className="fl-introduction-value-title">
          <div className="fl-introduction-value-title-text">
            {aboutData?.value?.title}
          </div>
          <div className="fl-introduction-value-title-desc">
            <div>
              累计服务{' '}
              <span className="gradient-text">{aboutData?.value?.res1}+</span>{' '}
              智慧空间
            </div>
            <div>
              智能调控{' '}
              <span className="gradient-text">{aboutData?.value?.res2}+</span>{' '}
              设备精准运行
            </div>
          </div>
        </div>
        <ImageCarousel dataSource={aboutData?.value?.details} />
      </div>

      {/* 生态合作 */}
      <div className="fl-introduction-ecology">
        <div className="fl-introduction-ecology-title">
          <div className="fl-introduction-ecology-title-text">
            {aboutData?.cooperation?.title}
          </div>
          <div className="fl-introduction-ecology-title-desc">
            {aboutData?.cooperation?.second}
          </div>
        </div>
        <div className="fl-introduction-ecology-list">
          {aboutData?.cooperation?.details?.map((item, index) => (
            <div className="fl-introduction-ecology-list-item" key={index}>
              <img src={item.image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
