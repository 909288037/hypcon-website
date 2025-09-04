import Header from '@/components/Header';
import './index.less';
const Join = () => {
  return (
    <div className="fl-join">
      <Header className="fl-join-header" />
      <div className="fl-join-banner">
        <div className="fl-join-banner-title">不止于智控，更遇见未来</div>
        <div>
          <div className="custom-btn" onClick={() => {}}>
            <div className="custom-btn-text">查看详情</div>
            <div className="custom-btn-arrow"></div>
          </div>
        </div>
        <div className="fl-join-title">加入我们</div>
      </div>
    </div>
  );
};

export default Join;
