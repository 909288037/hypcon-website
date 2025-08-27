// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}
function setRem() {
  //计算出 比例来 当前分辨率的宽%设计稿宽度
  const scale = window.screen.width / 1920
  // 给根元素设置font-size
  document.documentElement.style.fontSize = 192 * Math.min(scale, 2) + 'px'
}

export function render(oldRender: any) {
  document.documentElement.classList.add('leke-root')
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