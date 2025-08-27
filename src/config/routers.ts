export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    routes: [
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
    ],
  },
];
