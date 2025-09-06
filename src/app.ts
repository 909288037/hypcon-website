// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

const getScrollbarWidth = () => {
  // Create a temporary div container and append it into the body
  const container = document.createElement('div');
  // Append the container in the body
  document.body.appendChild(container);
  // Force scrollbar on the container
  container.style.overflow = 'scroll';

  // Add ad fake div inside the container
  const inner = document.createElement('div');
  container.appendChild(inner);

  // Calculate the width based on the container width minus its child width
  const width = container.offsetWidth - inner.offsetWidth;
  // Remove the container from the body
  document.body.removeChild(container);

  return width;
};


function setRem() {
  //计算出 比例来 当前分辨率的宽%设计稿宽度
  const scale = document.body.clientWidth / 1920
  // 给根元素设置font-size
  document.documentElement.style.fontSize = 192 * Math.min(scale, 2) + 'px'
}

export function render(oldRender: any) {
  setRem()
 window.onresize = function () {
  console.log('resize');
  
      setRem()
    }
  oldRender()
}

// export const layout = () => {
//   return {
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };

export function onRouteChange({
  location,
  clientRoutes,
  routes,
  action,
  basename,
  isFirst,
}) {
  // 页面回到顶部
  window.scrollTo(0, 0);
}