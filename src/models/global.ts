// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  // 产品中心下拉列表
  const [productList, setProductList] = useState<any>([]);
  // 解决方案下拉列表
  const [solutionList, setSolutionList] = useState<any>([]);
  console.log('🚀 ~ useUser ~ productList:', productList);
  return {
    name,
    setName,
    productList,
    setProductList,
    solutionList,
    setSolutionList,
  };
};

export default useUser;
