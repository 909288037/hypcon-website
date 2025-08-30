import rightArrowImg from '@/assets/images/right-arrow.png';
import './index.less';
const Card = () => {
  return (
    <div className="card">
      <div className="card-header">
        <img src="" alt="" />
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
