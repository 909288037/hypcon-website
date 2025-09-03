import rightArrowImg from '@/assets/images/right-arrow.png';
import Header from '@/components/Header';
import { history } from '@umijs/max';
import { Button } from 'antd';
import './index.less';
const ProductNoticeDetail = () => {
  return (
    <div className="product-notice-detail">
      <Header theme="light" />
      <div className="product-notice-detail-title">
        <div className="gradient-text">关于控制器系列通用型号退市公告</div>
      </div>
      <div className="product-notice-detail-content">
         尊敬的客户及合作伙伴：您好！首先感谢您及贵司对泛联智控控制器系列通用型号的信任和支持！泛联智控秉持成就客户的经营理念，不断提升产品品质和性能。
      </div>
      <div className="product-notice-detail-btn">
        <Button
          type="primary"
          onClick={() => {
            history.push('/product-notice');
          }}
        >
          返回列表
          <img src={rightArrowImg} alt="" />
        </Button>
      </div>
    </div>
  );
};

export default ProductNoticeDetail;
