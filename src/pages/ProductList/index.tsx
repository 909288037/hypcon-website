import Card from '@/components/Card';
import Header from '@/components/Header';
import { getProductCategoryDetailList } from '@/services/ProductController';
import { useParams, useRequest } from '@umijs/max';
import { useEffect } from 'react';
import './index.less';
const ProductList = () => {
  const params = useParams();
  console.log('🚀 ~ ProductList ~ params:', params);
  // 获取产品列表
  const {
    data: data,
    error: productListError,
    loading: productListLoading,
    run: getProductList,
  } = useRequest(getProductCategoryDetailList, {
    manual: true,
  });

  useEffect(() => {
    getProductList(params.id);

    return () => {};
  }, [params.id]);

  return (
    <div className="fl-product-list">
      <Header theme="light" />
      <div className="fl-product-list-container">
        <div className="fl-product-list-title">
          <div className="gradient-text">{data?.name}</div>
        </div>
        <div className="fl-product-list-desc">{data?.description}</div>
      </div>
      <div className="fl-product-list-cards">
        {data?.productList?.map((item) => {
          return (
            <Card
              type={item.detailType === '0' ? 'download' : 'view'}
              key={item.id}
              dataSource={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
