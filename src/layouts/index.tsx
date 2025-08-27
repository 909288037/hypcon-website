import { useEffect, useLayoutEffect } from 'react'
import { ConfigProvider, App, theme as AntdTheme } from 'antd'
import { Outlet, useModel, Helmet, useOutletContext } from '@umijs/max'
import zhCN from 'antd/locale/zh_CN'

import {
  px2remTransformer,
  StyleProvider,
  legacyLogicalPropertiesTransformer
} from '@ant-design/cssinjs'
import './index.less'
import Header from '@/components/Header'




const baseSize = 192 //设计稿宽度%10 比如 1920


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
          <Helmet>
           
          </Helmet>
          <Header />
          {/* <AppStore /> */}
          <Outlet />
        </ConfigProvider>
      </StyleProvider>
  )
}
