import { request } from "@umijs/max";


// 获取解决方案详情
export async function getCategoryTreeList() {
   return request<any>(`/prod/api/support/categoryTreeList`, {
    method: 'GET',
  });
 
}

// h获取产品列表
export async function getProductList(id: string | number) {
  return request<any>(`/prod/api/support/product/${id}`, {
    method: 'GET',
  });
}

// 获取关键字
export async function getKeywords() {
  return request<any>(`/prod/api/support/keyword`, {
    method: 'GET',
  });
}

// 获取产品文件列表
export async function getProductFileList(params) {
  return request<any>(`/prod/api/support/fileList`, {
    method: 'GET',
    params: params,
  });
}

// 获取产品目录
export async function getProductCategory() {
  return request<any>(`/prod/api/product/productFileCategory`, {
    method: 'GET',
  });
}


// 获取产品文件列表
export async function getProductFileListByCategory(fileCategoryId: number, id: number) {
  return request<any>(`/prod/api/product/fileList/${fileCategoryId}/${id}`, {
    method: 'GET',
  });
}

// 下载接口
export async function downloadFileStarem(params:any) {
  return request<any>(`/prod/api/download/download`, {
    method: 'GET',
    params,
    responseType: 'blob',
  });
}