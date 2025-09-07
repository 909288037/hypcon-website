import { request } from "@umijs/max";


// 获取解决方案详情
export async function getImportantList() {
   return request<any>(`/prod/api/notice/importantList`, {
    method: 'GET',
  });
 
}

// 获取新闻列表
export async function getNewsList(params) {
  return request<any>('/prod/api/notice/pageList', {
    method: 'GET',
    params
  });
}

// 获取背景图
export async function getBgImg() {
  return request<any>(`/prod/api/notice/bgImage`, {
    method: 'GET',
  });
}