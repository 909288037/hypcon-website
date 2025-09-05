import CaseBanner from '@/components/CaseBanner';
import Header from '@/components/Header';
import { getSolutionDetail } from '@/services/SolutionController';
import { goPage } from '@/utils';
import { useParams, useRequest } from '@umijs/max';
import { useState } from 'react';
import { Autoplay, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import downImg from './images/down.png';
import upImg from './images/up.png';
import './index.less';

const Solution = () => {
  const params = useParams();
  // 获取解决方案详情
  const {
    data: solutionDetail,
    error: solutionDetailError,
    loading: solutionDetailLoading,
  } = useRequest(() => {
    return getSolutionDetail(params.id);
  });

  console.log('🚀 ~ Solution ~ solutionDetail:', solutionDetail);

  const [icons, setIcons] = useState([
    {
      url: '',
      title: '工业智能化',
    },
    {
      url: '',
      title: '无缝集成',
    },
    {
      url: '',
      title: '高效协同',
    },
    {
      url: '',
      title: '广泛适配',
    },
    {
      url: '',
      title: '稳定可靠',
    },
  ]);
  const [advantageList, setAdvantageList] = useState(['', '', '', '']);
  return (
    <div className="fl-solution">
      <Header className="fl-solution-header" />
      {/* 封面图 */}
      <div className="fl-solution-cover">
        <img src={solutionDetail?.image} />
        <div className="fl-solution-cover-title">{solutionDetail?.title}</div>
      </div>
      <div className="fl-solution-content">
        <div className="fl-solution-content-left">
          <div className="fl-solution-content-left-title ">
            <div>{solutionDetail?.introVo?.title}</div>
          </div>
          <div className="fl-solution-content-left-desc">
            {solutionDetail?.introVo?.detail}
          </div>
          <div className="fl-solution-content-left-list">
            {solutionDetail?.feature?.map((item, index) => (
              <div className="fl-solution-content-left-list-item" key={index}>
                <div className="fl-solution-content-left-list-item-icon">
                  <img src={item.image} alt="" />
                </div>
                <div className="fl-solution-content-left-list-item-title">
                  {item.title}
                </div>
                <div className="fl-solution-content-left-list-item-num">
                  {item.res1}%-{item.res2}%
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fl-solution-content-right">
          <img src={solutionDetail?.introVo?.image} alt="" />
        </div>
      </div>

      <div className="fl-solution-section product-service">
        <div className="fl-solution-title">
          {solutionDetail?.architecture?.title}
        </div>
        <div className="fl-solution-img">
          <img src={solutionDetail?.architecture?.image} alt="" />
        </div>
        {solutionDetail?.product?.length && (
          <div className="fl-solution-tag">
            <div className="fl-solution-tag-text">推荐产品：</div>
            <div className="fl-solution-tag-list">
              {solutionDetail?.product.map((tag, index) => (
                <span
                  className="fl-solution-tag-item"
                  key={tag.id}
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
      </div>
      {/* 价值亮点 */}
      <div className="fl-solution-section fl-solution-value">
        <div className="fl-solution-title">价值亮点</div>
        <div className="fl-solution-value-banner">
          <Swiper
            // mousewheel
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay, Mousewheel]}
            spaceBetween={60}
            slidesPerView={4}
          >
            {solutionDetail?.value?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="fl-solution-value-banner-item">
                    {/* 图标 */}
                    <div className="fl-solution-value-banner-item-icon">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="fl-solution-value-banner-item-title">
                      {item.title}
                    </div>
                    <div
                      className="fl-solution-value-banner-item-desc"
                      dangerouslySetInnerHTML={{
                        __html: item.intro,
                      }}
                    />
                    ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                    <div className="fl-solution-value-banner-item-count">
                      <div className="fl-solution-value-banner-item-count-num">
                        <div className="gradient-text">{item.res1}%</div>
                        <div className="count-icon">
                          <img src={item.res1 < 0 ? downImg : upImg} alt="" />
                        </div>
                      </div>
                      <div className="fl-solution-value-banner-item-count-title">
                        {item.res2}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      {/* 典型案例 */}
      <div className="fl-solution-case">
        <CaseBanner
          dataSource={[
            {
              id: 1,
              title: solutionDetail?.title,
              caseList: solutionDetail?.caseList,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Solution;
