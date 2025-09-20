import { isImage } from '@/utils';
import { history } from '@umijs/max';
import { useInViewport } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import SlotMachineNumber from '../SlotMachineNumber';
import './index.less';

const AdvantageBanner = ({ dataSource }) => {
  const [count, setCount] = useState(0);
  // 专利软著数量
  const [patentCount, setPatentCount] = useState(0);
  // 研发占比
  const [researchRatio, setResearchRatio] = useState(0);
  const countRef = useRef(null);
  const [inViewport] = useInViewport(countRef, {
    threshold: 1,
  });

  useEffect(() => {
    if (dataSource && inViewport) {
      setCount(dataSource.res1 + '+');
      setPatentCount(dataSource.res2 + '%');
      setResearchRatio(dataSource.res3 + '+');
    }
  }, [inViewport]);

  return (
    <div className="advantage-banner">
      <div className="advantage-banner-content">
        <div className="advantage-banner-title">
          <div className="advantage-banner-title-text pc-block">为什么选择我们？</div>
          <div className="advantage-banner-title-company">
            {dataSource?.title}
          </div>
        </div>
        <div className="advantage-banner-desc">{dataSource?.intro}</div>
        <div className="advantage-banner-count" ref={countRef}>
          <div className="advantage-banner-count-item">
            <div className="advantage-banner-count-item-num">
              <SlotMachineNumber value={count} duration={1000} />
            </div>
            <div className="advantage-banner-count-item-line"></div>
            <div className="advantage-banner-count-item-text">专利软著</div>
          </div>
          <div className="advantage-banner-count-item">
            <div className="advantage-banner-count-item-num">
              <SlotMachineNumber value={patentCount} duration={1000} />
            </div>
            <div className="advantage-banner-count-item-line"></div>
            <div className="advantage-banner-count-item-text">研发占比</div>
          </div>
          <div className="advantage-banner-count-item">
            <div className="advantage-banner-count-item-num">
              <SlotMachineNumber value={researchRatio} duration={1000} />
            </div>
            <div className="advantage-banner-count-item-line"></div>
            <div className="advantage-banner-count-item-text">参与项目</div>
          </div>
        </div>
        <div
          className="custom-primary-btn"
          onClick={() => {
            history.push('/introduction');
          }}
        >
          <div className="custom-btn-text">了解更多</div>
          <div className="custom-btn-arrow"></div>
        </div>
      </div>
      {dataSource?.image && (
        <div className="advantage-banner-bg">
          {isImage(dataSource?.image) ? (
            <img src={dataSource?.image} alt="" />
          ) : (
            <video
              src={dataSource?.image}
              controls={false}
              muted
              autoPlay
              loop
            ></video>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvantageBanner;
