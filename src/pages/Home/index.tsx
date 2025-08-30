import Header from '@/components/Header';
import ProductBanner from '@/components/ProductBanner';
import SolutionBanner from '@/components/SolutionBanner';
import TopBanner from '@/components/TopBanner';

import AdvantageBanner from '@/components/AdvantageBanner';
import CaseBanner from '@/components/CaseBanner';
import NewsBlock from '@/components/NewsBlock';
import React, { useEffect } from 'react';
import './index.less';

const HomePage: React.FC = () => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="fl-home">
      {/* 头部 导航 */}
      <Header className="fl-home-header" />

      {/* 首页轮播图 */}
      <div className="fl-home-banner">
        <TopBanner />
      </div>
      {/* 产品轮播图 */}
      <div className="fl-home-product">
        <ProductBanner />
      </div>
      {/* 解决方案 轮播图 */}
      <div className="fl-home-solution">
        <SolutionBanner />
      </div>
      {/* 典型案例 */}
      <div className="fl-home-case">
        <CaseBanner />
      </div>
      {/* 公司优势 */}
      <div className="fl-home-advantage">
        <AdvantageBanner />
      </div>

      {/* 新闻资讯 */}
      <div className="fl-home-news">
        <NewsBlock />
      </div>
    </div>
  );
};

export default HomePage;
