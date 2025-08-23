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
    </div>
  );
};

export default HomePage;
