import rightArrowImg from '@/assets/images/right-arrow.png';
import Header from '@/components/Header';
import { getProductNoticeDetail } from '@/services/ServiceNetwork';
import { history, useParams, useRequest } from '@umijs/max';
import { Button } from 'antd';
import './index.less';
const ProductNoticeDetail = () => {
  const params = useParams();
  // 获取产品公告详情
  const { data: detail, run } = useRequest(() => {
    return getProductNoticeDetail(params.id);
  });
  return (
    <div className="product-notice-detail">
      <Header theme="light" />
      <div className="product-notice-detail-title">
        <div className="gradient-text">{detail?.noticeTitle}</div>
      </div>
      <div
        className="product-notice-detail-content"
        dangerouslySetInnerHTML={{
          __html: detail?.noticeContent,
        }}
      ></div>
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
