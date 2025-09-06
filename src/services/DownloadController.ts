import { request } from "@umijs/max";


// 获取解决方案详情
export async function getCategoryTreeList() {
   return request<any>(`/api/support/categoryTreeList`, {
    method: 'GET',
  });
 
}

// h获取产品列表
export async function getProductList(id: string | number) {
  return request<any>(`/api/support/product/${id}`, {
    method: 'GET',
  });
}

// 获取关键字
export async function getKeywords() {
  return request<any>(`/api/support/keyword`, {
    method: 'GET',
  });
}

// 获取产品文件列表
export async function getProductFileList() {
  return request<any>(`/api/support/fileList`, {
    method: 'GET',
  });
}

// 获取产品目录
export async function getProductCategory() {
  return request<any>(`/api/product/productFileCategory`, {
    method: 'GET',
  });
}


// 获取产品文件列表
export async function getProductFileListByCategory(fileCategoryId: number, id: number) {
  return request<any>(`/api/product/fileList/${fileCategoryId}/${id}`, {
    method: 'GET',
  });
}