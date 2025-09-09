import Card from '@/components/Card';
import Header from '@/components/Header';
import { getProductCategoryDetailList } from '@/services/ProductController';
import { useParams, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import './index.less';
const Product = () => {
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
  const [icons, setIcons] = useState([
    {
      url: '',
      title: '工业智能化',
    },
    {
      url: '',
      title: '无缝集成',
    },
    {
      url: '',
      title: '高效协同',
    },
    {
      url: '',
      title: '广泛适配',
    },
    {
      url: '',
      title: '稳定可靠',
    },
  ]);
  return (
    <div className="fl-product">
      <Header className="fl-product-header" theme="light" />

      <div className="fl-product-content">
        <div className="fl-product-content-left">
          <div className="fl-product-content-left-title ">
            <div className="gradient-text">{data?.name}</div>
          </div>
          <div
            className="fl-product-content-left-desc "
           
          >
            <div className='ql-editor'  dangerouslySetInnerHTML={{
              __html: data?.description,
            }}>

            </div>
          </div>
          <div className="fl-product-content-left-list">
            {data?.detailList?.map((item, index) => (
              <div className="fl-product-content-left-list-item" key={item.id}>
                <div className="fl-product-content-left-list-item-icon">
                 {item.image && <img src={item.image} alt="" />}
                </div>
                <div className="fl-product-content-left-list-item-title">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fl-product-content-right">
          <img src={data?.image} alt="" />
        </div>
      </div>
      <div className="fl-product-cards">
        {[...(data?.productList || []), ...(data?.childList || [])]?.map((item) => {
          return (
            <Card
              key={item.id}
              type={item.detailType === '0' ? 'download' : 'view'}
              dataSource={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Product;
