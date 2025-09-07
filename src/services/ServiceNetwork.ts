import { request } from "@umijs/max";


// 获取服务网络数据
export async function getServiceNetwork() {
  return request('/prod/api/support/net');
}

// 提交产品咨询

export async function submitProductConsult(params: any) {
  return request('/prod/api/support/submitConsult', {
    method: 'POST',
    data: params,
  });
}

// 培训服务
export async function getTrainingService() {
  return request('/prod/api/support/train');
}

// 常见问题
export async function getQuestion(params) {
  return request('/prod/api/support/question', {
    method: 'GET',
    params: params,

  });
}

// 产品公告
export async function getProductNotice(params) {
  return request('/prod/api/support/productAnnouncement', {
    method: 'GET',
    params: params,

  });
}

// 产品公告详情
export async function getProductNoticeDetail(id) {
  return request(`/prod/api/notice/detail/${id}`, {
    method: 'GET',

  });
}

//提交意见反馈
export async function submitFeedback(params) {
  return request('/prod/api/support/submitFeedBack', {
    method: 'POST',
    data: params,

  });
}