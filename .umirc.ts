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
  // hash: true,
  //  history: {
  //   type: 'hash'
  // },
});

