import Header from '@/components/Header';
import { useState } from 'react';
import './index.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel } from 'swiper/modules';
import CaseBanner from '@/components/CaseBanner';
const Solution = () => {
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
        {/* <img src={''}  /> */}
        <div className="fl-solution-cover-title">智慧医院</div>
      </div>
      <div className="fl-solution-content">
        <div className="fl-solution-content-left">
          <div className="fl-solution-content-left-title ">
            <div >医院智控解决方案</div>
          </div>
          <div className="fl-solution-content-left-desc">
            泛联工业自动化产品线为智能制造提供强大核心动力。HypStudio开放自动化平台,打破传统限制,实现系统无缝集成与高效协同。可编程控制器涵盖中大型与小型,适配复杂或紧凑工业场景,精准控制生产流程。FCS500与FCS300
            I/O系统,稳定采集与传输信号,保障设备精准联动。从平台到控制器,再到1/0系统,泛联助力工业生产智能化升级,提升效率与可靠性,驱动工业未来。
          </div>
          <div className="fl-solution-content-left-list">
            {icons.map((item, index) => (
              <div className="fl-solution-content-left-list-item" key={index}>
                <div className="fl-solution-content-left-list-item-icon">
                  <img src={item.url} alt="" />
                </div>
                <div className="fl-solution-content-left-list-item-title">
                  {item.title}
                </div>
                <div className='fl-solution-content-left-list-item-num'>30%-40%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="fl-solution-content-right">
          <img src="" alt="" />
        </div>
      </div>

      <div className='fl-solution-section product-service'>
        <div className='fl-solution-title'>智控体系与架构</div>
        <div className='fl-solution-img'>
            <img src="" alt="" />
        </div>
        <div className='fl-solution-tag'>
             <div className="fl-solution-tag-text">推荐产品：</div>
                  <div className="fl-solution-tag-list">
                    {['产品1', '产品2', '产品3'].map((tag, index) => (
                      <span className="fl-solution-tag-item" key={index}>
                        {tag}
                      </span>
                    ))}
                  </div>
        </div>
      </div>
      {/* 价值亮点 */}
       <div className='fl-solution-section fl-solution-value'>
        <div className='fl-solution-title'>价值亮点</div>
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
              {advantageList.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="fl-solution-value-banner-item">
                      {/* 图标 */}
                      <div className="fl-solution-value-banner-item-icon">
                        <img src={''} alt="" />
                      </div>
                      <div className="fl-solution-value-banner-item-title">
                        降低运营成本​
                      </div>
                      <div className="fl-solution-value-banner-item-desc">
                        ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                        <div className="fl-solution-value-banner-item-desc-item">
                          在部署方面，HypView采用B/S架构并取得了信创适配认证，支持多类型终端部署，可以节省软件部署和维护费。
                        </div>
                        <div className="fl-solution-value-banner-item-desc-item">
                          在管理方面，采用设备原型化管理的方式，能够减少人工配置时间，降低管理成本。
                        </div>
                      </div>
                      <div className='fl-solution-value-banner-item-count'>
                        <div className='fl-solution-value-banner-item-count-num'>
                            <div className='gradient-text'>15%</div>
                            <div className='count-icon'><img src="" alt="" /></div>
                        </div>
                        <div className='fl-solution-value-banner-item-count-title'>业务体验</div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
      </div>
      {/* 典型案例 */}
      <div className='fl-solution-case'>
         <CaseBanner />
      </div>
    </div>
  );
};

export default Solution;
