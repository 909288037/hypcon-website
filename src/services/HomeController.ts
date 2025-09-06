import { request } from "@umijs/max";

// 获取首页轮播图
export async function getHomeBanner() {
  return request<any>('/api/home/banner', {
    method: 'GET',
  });
}

// 获取产品下拉列表
export async function getProductList() {
  return request<any>('/api/home/productCategory', {
    method: 'GET',
  });
}

// 获取解决方案列表
export async function getSolutionList() {
  return request<any>('/api/home/solution', {
    method: 'GET',
  });
}

// 获取推荐产品
export async function getRecommendProduct() {
  return request<any>('/api/home/product', {
    method: 'GET',
  });
}

// 获取典型案例
export async function getCaseList() {
  return request<any>('/api/home/case', {
    method: 'GET',
  });
}

// 公司实力
export async function getAbout() {
  return request<any>('/api/home/about', {
    method: 'GET',
  });
}

// 获取新闻列表
export async function getNewsList() {
  return request<any>('/api/home/notice', {
    method: 'GET',
  });
}

// 搜索接口
export async function getSearchList(params: {keyword: string}) {
  return request<any>(`/api/search/data`, {
    method: 'GET',
    params,
  });
}