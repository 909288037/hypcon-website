import Header from '@/components/Header';
import TopBanner from '@/components/TopBanner';

import React, { useEffect } from 'react';
import './index.less';

const HomePage: React.FC = () => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="fl-home">
      {/* 头部 导航 */}
      <div className="fl-home-header">
        <Header />
      </div>
      {/* 首页轮播图 */}
      <div className="fl-home-banner">
        <TopBanner />
      </div>
      {/* 产品轮播图 */}
      <div className="fl-home-product">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam culpa
        officia, a, quasi magni rerum reprehenderit ratione id nihil pariatur
        quos illo et modi doloribus? Rerum aut mollitia at aperiam?
        {/* <ProductBanner /> */}
      </div>
    </div>
  );
};

export default HomePage;
