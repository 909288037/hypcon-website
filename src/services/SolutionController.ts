import { request } from "@umijs/max";


// 获取解决方案详情
export async function getSolutionDetail(id: any) {
   return request<any>(`/prod/api/solution/detail/${id}`, {
    method: 'GET',
  });
 
}