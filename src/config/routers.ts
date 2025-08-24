export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
    ],
  },
];
