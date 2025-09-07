import { request } from "@umijs/max";

// 获取首页轮播图
export async function getHomeBanner() {
  return request<any>('/prod/api/home/banner', {
    method: 'GET',
  });
}

// 获取产品下拉列表
export async function getProductList() {
  return request<any>('/prod/api/home/productCategory', {
    method: 'GET',
  });
}

// 获取解决方案列表
export async function getSolutionList() {
  return request<any>('/prod/api/home/solution', {
    method: 'GET',
  });
}

// 获取推荐产品
export async function getRecommendProduct() {
  return request<any>('/prod/api/home/product', {
    method: 'GET',
  });
}

// 获取典型案例
export async function getCaseList() {
  return request<any>('/prod/api/home/case', {
    method: 'GET',
  });
}

// 公司实力
export async function getAbout() {
  return request<any>('/prod/api/home/about', {
    method: 'GET',
  });
}

// 获取新闻列表
export async function getNewsList() {
  return request<any>('/prod/api/home/notice', {
    method: 'GET',
  });
}

// 搜索接口
export async function getSearchList(params: any) {
  return request<any>(`/prod/api/search/pageProductFile`, {
    method: 'GET',
    params,
  });
}

// 首页搜索
export async function getSearchListByKeyword(params: any) {
  return request<any>(`/prod/api/search/data`, {
    method: 'GET',
    params,
  });
}

// 产品分页接口
export async function getSearchProductList(params: any) {
  return request<any>(`/prod/api/search/pageProduct`, {
    method: 'GET',
    params,
  }); 
}

// 解决方案分页
export async function getSearchSolutionList(params: any) {
  return request<any>(`/prod/api/search/pageSolution`, {
    method: 'GET',
    params,
  }); 
}

// 新闻分页接口
export async function getSearchNewsList(params: any) {
  return request<any>(`/prod/api/search/pageNotice`, {
    method: 'GET',
    params,
  }); 
}
