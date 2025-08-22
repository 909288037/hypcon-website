import { defineConfig } from '@umijs/max';
import routers from './src/config/routers';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
  },
  routes: routers,
  npmClient: 'pnpm',
});

