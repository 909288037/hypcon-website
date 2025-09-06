import arrowRight from '@/assets/images/right-arrow-primary.png';
import Header from '@/components/Header';
import { getProductNotice } from '@/services/ServiceNetwork';
import { UnorderedListOutlined } from '@ant-design/icons';
import { history, useRequest } from '@umijs/max';
import { Pagination, PaginationProps } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import './index.less';
const ProductNotice = () => {
  // 获取产品公告列表
  const { data: newList, run } = useRequest(getProductNotice);
  const listRef = useRef(null);
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
        <div className="product-notice-content-list" ref={listRef}>
          {newList?.rows?.map((item, index) => {
            return (
              <div
                className="product-notice-content-list-item"
                key={index}
                onClick={() => {
                  history.push(`/product-notice/${item.id}`);
                }}
              >
                <div className="product-notice-content-list-item-title">
                  {item.noticeTitle}
                </div>
                <div className="product-notice-content-list-item-footer">
                  <div className="product-notice-content-list-item-footer-time">
                    {dayjs(item.createTime).format('YYYY年MM月DD日')}
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
          <Pagination
            total={newList?.total}
            hideOnSinglePage
            itemRender={itemRender}
            align="center"
            onChange={(page) => {
              listRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'cneter',
                inline: 'nearest',
              });
              run({
                pageNum: page,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductNotice;
