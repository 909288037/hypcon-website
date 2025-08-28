import { useState } from 'react';
import SlotMachineNumber from '../SlotMachineNumber';
import './index.less';

const AdvantageBanner = () => {
    const [count, setcount] = useState(0)
  return (
    <div className="advantage-banner" onClick={() => {
        setcount('130+')
    }}>
      <div className="advantage-banner-content">
        <div className="advantage-banner-title">
          <div className="advantage-banner-title-text">为什么选择我们？</div>
          <div className="advantage-banner-title-company">
            浙江泛联智控信息技术有限公司
          </div>
        </div>
        <div className="advantage-banner-desc">
          浙江泛联智控信息技术有限公司（简称“泛联智控”或“HYPCON”）是面向园区、枢纽、城轨、水厂、数据中心等复杂城市空间提供智能控制产品的科技公司。泛联智控遵循“让控制更智能，让生活更美好”的发展愿景，坚持自主创新，聚焦城市空间数字化、智能化的需求，构建了全栈式、高性能、模块化智控产品体系，帮助客户打造更高效、更绿色、更人性化的城市智能体。
        </div>
        <div className="advantage-banner-count">
          <div className="advantage-banner-count-item">
            <div className="advantage-banner-count-item-num">
              <SlotMachineNumber
                value={count}
                duration={1000}
              />
            </div>
            <div className="advantage-banner-count-item-line"></div>
            <div className="advantage-banner-count-item-text">专利软著</div>
          </div>
          <div className="advantage-banner-count-item">
            <div className="advantage-banner-count-item-num">60%</div>
            <div className="advantage-banner-count-item-line"></div>
            <div className="advantage-banner-count-item-text">研发占比</div>
          </div>
          <div className="advantage-banner-count-item">
            <div className="advantage-banner-count-item-num">1200+</div>
            <div className="advantage-banner-count-item-line"></div>
            <div className="advantage-banner-count-item-text">参与项目</div>
          </div>
        </div>
        <div className="custom-primary-btn" onClick={() => {}}>
          <div className="custom-btn-text">了解更多</div>
          <div className="custom-btn-arrow"></div>
        </div>
      </div>
      <div className="advantage-banner-bg"></div>
    </div>
  );
};

export default AdvantageBanner;
