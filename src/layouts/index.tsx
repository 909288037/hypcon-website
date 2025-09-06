import phoneImg from '@/assets/images/phone.png';
import topImg from '@/assets/images/top.png';
import { Helmet, Outlet } from '@umijs/max';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import Footer from '@/components/Footer';
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import { useScroll } from 'ahooks';
import 'normalize.css/normalize.css';
import { useEffect, useState } from 'react';
import './index.less';

const baseSize = 192; //设计稿宽度%10 比如 1920
function scrollToTop() {
  // 使用现代浏览器的平滑滚动API
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else {
    // 兼容旧浏览器的实现
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  }
}

export default function Layout() {
  const scroll = useScroll(document);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    if (scroll?.top >= 200) {
      setShowTop(true);
    } else {
      setShowTop(false);
    }
  }, [scroll]);

  return (
    <StyleProvider
      hashPriority="high"
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <ConfigProvider
        //   theme={{
        //     token: {
        //       ...antdToken
        //     },
        //     // cssVar: true,
        //     hashed: false,
        //     components: components
        //   }}
        locale={zhCN}
      >
        <Helmet></Helmet>
        {/* <AppStore /> */}
        <Outlet />
        {/* 悬浮按钮 */}
        <div className="fl-float-btn" hidden={!showTop}>
          <div className="fl-float-btn-phone">
            <img src={phoneImg} alt="" />
          </div>
          <div
            className="fl-float-btn-top"
            onClick={() => {
              // 回到顶部
              scrollToTop();
            }}
          >
            <img src={topImg} alt="" />
          </div>
        </div>
        {/* 底部 */}
        <Footer />
      </ConfigProvider>
    </StyleProvider>
  );
}
