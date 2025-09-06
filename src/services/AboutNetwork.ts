import { request } from "@umijs/max";


// 企业简介
export async function getAbout() {
  return request('/api/about/about', {
    method: 'GET',
  });
}

// 联系我们
export async function getContact() {
  return request('/api/about/concat', {
    method: 'GET',
  });
}

// 加入我们
export async function getJoinUs() {
  return request('/api/about/join', {
    method: 'GET',
  });
}