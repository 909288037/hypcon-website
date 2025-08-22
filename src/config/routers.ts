export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    layout: false,
    routes: [
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
    ],
  },
];
