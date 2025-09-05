import { request } from "@umijs/max";


// 获取产品详情
export async function getProductDetail(type: any, id: any) {
  return request<any>(`/proxy/api/product/detail/${type}/${id}`, {
    method: 'GET',
  });
}