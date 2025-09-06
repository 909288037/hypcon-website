import { request } from "@umijs/max";


// 获取产品详情
export async function getProductDetail(type: any, id: any) {
  return request<any>(`/api/product/detail/${type}/${id}`, {
    method: 'GET',
  });
}

// 获取产品规格参数
export async function getProductSpecification(id: any) {
  return request<any>(`/api/product/specifications/${id}`, {
    method: 'GET',
  });
}
