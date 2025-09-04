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