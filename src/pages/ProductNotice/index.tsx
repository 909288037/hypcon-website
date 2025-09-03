import arrowRight from '@/assets/images/right-arrow-primary.png';
import Header from '@/components/Header';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Pagination, PaginationProps } from 'antd';
import { useState } from 'react';
import './index.less';
import { history } from '@umijs/max';
const ProductNotice = () => {
  const [newList, setNewList] = useState(['', '']);
  const itemRender: PaginationProps['itemRender'] = (
    _,
    type,
    originalElement,
  ) => {
    if (type === 'prev') {
      return (
        <img src={arrowRight} alt="" style={{ transform: 'rotate(180deg)' }} />
      );
    }
    if (type === 'next') {
      return <img src={arrowRight} alt="" />;
    }
    return originalElement;
  };
  return (
    <div className="product-notice">
      <Header className="product-notice-header" theme="light" />
      <div className="product-notice-title">
        <div className="gradient-text">产品公告</div>
      </div>
      <div className="product-notice-content">
        <div className="product-notice-content-list">
          {newList.map((item, index) => {
            return (
              <div className="product-notice-content-list-item" key={index} onClick={() => {
                history.push(`/product-notice/1`)
              }}>
                <div className="product-notice-content-list-item-title">
                  关于控制器系列通用型号退市公告
                </div>
                <div className="product-notice-content-list-item-footer">
                  <div className="product-notice-content-list-item-footer-time">
                    2025年8月13日
                  </div>
                  <div className="product-notice-content-list-item-footer-btn">
                    查看详情 <UnorderedListOutlined />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="product-notice-pagination">
          <Pagination total={50} itemRender={itemRender} align="center" />
        </div>
      </div>
    </div>
  );
};

export default ProductNotice;
