import { request } from "@umijs/max";


// 企业简介
export async function getAbout() {
  return request('/api/about/about', {
    method: 'GET',
  });
}