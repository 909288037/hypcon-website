import { Helmet, Outlet } from '@umijs/max';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import Footer from '@/components/Footer';
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import './index.less';

const baseSize = 192; //设计稿宽度%10 比如 1920
import 'normalize.css/normalize.css'
export default function Layout() {
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
        {/* 底部 */}
        <Footer />
      </ConfigProvider>
    </StyleProvider>
  );
}
