import rightArrowImg from '@/assets/images/right-arrow.png';
import downLoadImg from './images/download.png'
import downLoadImgHover from './images/download-hover.png'
import './index.less';
interface CardProps {
  type?: 'view' | 'download';
}
const Card: React.FC<CardProps> = ({ type = 'view' }) => {
  if(type === 'download') {
    return (
      <div className="card-download">
        <div className="card-download-header">
          {/* <img src="" alt="" /> */}
        </div>
        <div className="card-download-body">
          <div className="card-download-body-title">HypStuido开放自动化平台</div>
          <div className="card-download-body-desc">
            量程范围0-2000ppm
            <br />
            输出信号：0-10V/4-20mA拨码+RS-485通讯
            <br />
            供电电压：24VAC/DC（16-30VDC）
            <br />
            测量精度：±75ppm±3%FS
            <br />
            带1.3寸液晶显示屏；
            <br />
            最大功耗:3W
          </div>
        </div>
         <div className="card-download-btn">
          </div>
      </div>
    )
  }
  return (
    <div className="card">
      <div className="card-header">
        {/* <img src="" alt="" /> */}
      </div>
      <div className="card-body">
        <div className="card-body-title">HypStuido开放自动化平台</div>
        <div className="card-body-desc">
          泛联工业自动化产品线为智能制造提供强大核心动力。HypStudio开放自动化平台,打破传统限制,实现系统无缝集成与高效协同。
        </div>
      </div>
      <div className="card-footer">
        <div className="card-footer-btn">
          <img src={rightArrowImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Card;
