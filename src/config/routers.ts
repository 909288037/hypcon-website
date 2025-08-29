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
      // 产品列表页 有分类图
      {
        name: '产品列表',
        path: '/product',
        component: './Product',
      },
      // 产品列表页 无分类图
      // {
      //   name: '产品列表',
      //   path: '/product2',
      //   component: './ProductList',
      // }

    ],
  },
];
