import Header from '@/components/Header';
import ProductBanner from '@/components/ProductBanner';
import SolutionBanner from '@/components/SolutionBanner';
import TopBanner from '@/components/TopBanner';
import { useRequest } from '@umijs/max';

import AdvantageBanner from '@/components/AdvantageBanner';
import CaseBanner from '@/components/CaseBanner';
import NewsBlock from '@/components/NewsBlock';
import {
  getAbout,
  getCaseList,
  getHomeBanner,
  getNewsList,
  getRecommendProduct,
  getSolutionList,
} from '@/services/HomeController';
import React, { useEffect } from 'react';
import './index.less';

const HomePage: React.FC = () => {
  const {
    
    data: bannerData,
    error,
    loading,
  } = useRequest(() => {
    return getHomeBanner();
  });

  // 获取推荐产品列表
  const {
    data: productList,
    error: productListError,
    loading: productListLoading,
  } = useRequest(() => {
    return getRecommendProduct();
  });

  // 解决方案
  const {
    data: solutionList,
    error: solutionListError,
    loading: solutionListLoading,
  } = useRequest(() => {
    return getSolutionList();
  });
  // 典型案例
  const {
    data: caseList,
    error: caseListError,
    loading: caseListLoading,
  } = useRequest(() => {
    return getCaseList();
  });

  // 公司简介
  const {
    data: companyInfo,
    error: companyInfoError,
    loading: companyInfoLoading,
  } = useRequest(() => {
    return getAbout();
  });

  // 新闻资讯
  const {
    data: newsList,
    error: newsListError,
    loading: newsListLoading,
  } = useRequest(() => {
    return getNewsList();
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="fl-home">
      {/* 头部 导航 */}
      <Header className="fl-home-header" isFixed/>

      {/* 首页轮播图 */}
      <div className="fl-home-banner">
        <TopBanner dataSource={bannerData} />
      </div>
      {/* 产品轮播图 */}
      <div className="fl-home-product">
        <ProductBanner dataSource={productList} />
      </div>
      {/* 解决方案 轮播图 */}
      <div className="fl-home-solution">
        <SolutionBanner dataSource={solutionList} />
      </div>
      {/* 典型案例 */}
      <div className="fl-home-case">
        <CaseBanner dataSource={caseList} />
      </div>
      {/* 公司优势 */}
      <div className="fl-home-advantage">
        <AdvantageBanner dataSource={companyInfo} />
      </div>

      {/* 新闻资讯 */}
      <div className="fl-home-news">
        <NewsBlock dataSource={newsList} />
      </div>
    </div>
  );
};

export default HomePage;
