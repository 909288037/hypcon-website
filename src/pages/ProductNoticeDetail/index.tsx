import rightArrowImg from '@/assets/images/right-arrow.png';
import Header from '@/components/Header';
import { getProductNoticeDetail } from '@/services/ServiceNetwork';
import { history, useParams, useRequest } from '@umijs/max';
import { Button } from 'antd';
import { useEffect } from 'react';
import './index.less';
const ProductNoticeDetail = () => {
  const params = useParams();
  // 获取产品公告详情
  const { data: detail, run } = useRequest(() => {
    return getProductNoticeDetail(params.id);
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            // history.push('/product-notice');
            history.go(-1);
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
