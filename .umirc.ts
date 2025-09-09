import { defineConfig } from '@umijs/max';
import routers from './src/config/routers';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  title: '泛联·HYPCON',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  routes: routers,
  npmClient: 'pnpm',
  extraPostCSSPlugins: [
   { 
    "postcss-pxtorem": {
        rootValue: 192,
        propList: ['*'],
        unitPrecision: 2, // 保留几位小数
        selectorBlackList: ['.norem',], // 排除不转换的类名
        mediaQuery: false, // 允许在媒体查询中转换px
        minPixelValue: 3 // 设置要替换的最小像素值
    }}
  ],
  proxy: {
    '/prod': {
      target: 'http://121.40.200.150:8089',
      // target: 'http://192.168.150.71:8088',
      changeOrigin: true,
      // pathRewrite: { '^/proxy': '' },
    }, 
  },
  hash: true,
   history: {
    type: 'hash'
  },
   extraBabelPlugins:
    process.env.NODE_ENV === "production" ? ["transform-remove-console"] : []
});

