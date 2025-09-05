import { request } from "@umijs/max";

// 获取首页轮播图
export async function getHomeBanner() {
  return request<any>('/proxy/api/home/banner', {
    method: 'GET',
  });
}

// 获取产品下拉列表
export async function getProductList() {
  return request<any>('/proxy/api/home/productCategory', {
    method: 'GET',
  });
}

// 获取解决方案列表
export async function getSolutionList() {
  return request<any>('/proxy/api/home/solution', {
    method: 'GET',
  });
}

// 获取推荐产品
export async function getRecommendProduct() {
  return request<any>('/proxy/api/home/product', {
    method: 'GET',
  });
}

// 获取典型案例
export async function getCaseList() {
  return request<any>('/proxy/api/home/case', {
    method: 'GET',
  });
}

