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
      {
        name: '产品列表',
        path: '/product-list',
        component: './ProductList',
      },
      // 软件产品详情
      {
        name: '软件产品详情',
        path: '/product/:id',
        component: './ProductDetail',
      },
      // 硬件产品详情
      {
        name: '硬件产品详情',
        path: '/product-hardware/:id',
        component: './HardwareProductDetail',
      },
      // 解决方案
      {
        name: '解决方案',
        path: '/solution',
        component: './Solution',
      },
      // 资料下载
      {
        name: '资料下载',
        path: '/download',
        component: './Download',
      },
      // 服务网络
      {
        name: '服务网络',
        path: '/service-network',
        component: './ServiceNetwork',
      },
      //  产品咨询
      {
        name: '产品咨询',
        path: '/product-consult',
        component: './ProductConsult',
      },
      // 意见反馈
      {
        name: '意见反馈',
        path: '/feedback',
        component: './Feedback',
      },
      // 培训服务
      {
        name: '培训服务',
        path: '/training-service',
        component: './TrainingService',
      },
      // 常见问题
      {
        name: '常见问题',
        path: '/faq',
        component: './FAQ',
      },
      // 产品公告
      {
        name: '产品公告',
        path: '/product-notice',
        component: './ProductNotice',
      },
      // 公告详情
      {
        name: '公告详情',
        path: '/product-notice/:id',
        component: './ProductNoticeDetail',
      },
    ],
  },
];
