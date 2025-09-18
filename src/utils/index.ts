import { downloadFileStarem } from '@/services/DownloadController';
import { history } from '@umijs/max';
// 预加载图片的工具函数
export const preloadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

// 下载文件的工具函数
/**
 * 从指定 URL 下载图片
 * @param {string} imageUrl - 图片的 URL
 * @param {string} filename - 下载后的文件名（建议包含扩展名，如 'image.jpg'）
 */
export async function downloadFile(imageUrl, filename = 'download.jpg') {
    try {
        // 1. 使用 fetch 获取图片数据
        const blob = await downloadFileStarem({
            path: imageUrl,
            name: filename
        });
        
       
        
        // 3. 创建一个指向 Blob 的临时 URL
        const blobUrl = URL.createObjectURL(blob);
        
        // 4. 创建一个隐藏的 <a> 标签用于下载
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename; // 设置下载的文件名
        
        // 5. 将链接添加到 DOM 并触发点击
        document.body.appendChild(link);
        link.click();
        
        // 6. 下载完成后，移除链接并释放 Blob URL
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        
    } catch (error) {
        console.error('图片下载失败:', error);
        // 可以在这里处理错误，例如提示用户
    }
}

// 判断url地址是图片还是视频
export function isImage(url: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
  for (const ext of imageExtensions) {
    if (url?.endsWith(ext)) {
      return true;
    }
  }
  return false;
}


export const goPage = (item: any) => {
    console.log("🚀 ~ goPage ~ item:", item)
    // 跳转解决方案
    if (item.isSolution) {
      history.push(`/solution/${item.id}`);
      return;
    }

    // 本地导航跳转
    if (item.url) {
      history.push(item.url);
      return;
    }
    // 外链
    if (item.detailType === '2') {
      window.open(item.link);
      return;
    }
    // 无详情
    if(item.detailType === '0') {
        history.push(`/download/?search=${item.name}&id=${item.id}`);
        return
      }
    // 跳转软件详情
    if (item.type === '0') {
      
      history.push(`/product/${item.type}/${item.relationId || item.id}`);
      return
    } else if (item.type === '1') {
      // 跳转硬件详情
      history.push(`/product-hardware/${item.type}/${item.relationId || item.id}`);
      return
    }
    if(!item.id) return
    // 跳转产品列表
    if (
      item.products?.length > 0 || item.children?.length > 0 ||
      (item.children?.length === 0 && item.products?.length === 0)
      || (!item.children && !item.products)
    ) {
      if (item.showType === 1) {
        // 有分类图
        history.push(`/product/${item.id}`);
      } else {
        // 无分类图
        history.push(`/product-list/${item.id}`);
      }
      return;
    }
  };


  
/**
 * 从 HTML 字符串中提取纯文本
 * @param html - HTML 字符串
 * @returns 纯文本
 */
export function extractPlainTextFromHTML(html: string): string {
  if (!html || typeof html !== 'string') return '';

  // 创建 DOMParser 实例
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // 提取 body 的文本内容（自动去除标签）
  return doc.body.textContent || doc.body.innerText || '';
}

/**
 * 判断URL是否包含域名，如果没有则拼接当前域名
 * @param {string} url - 待处理的URL
 * @returns {string} - 处理后的完整URL
 */
export function ensureFullUrl(url: string) {
    // 如果url为空或非字符串，直接返回
    if (!url || typeof url !== 'string') {
        return url;
    }

    // 去除首尾空格
    url = url.trim();

    // 如果已经是完整URL（包含协议和域名），直接返回
    if (/^(https?:)?\/\//i.test(url)) {
        return url;
    }

    // 如果是相对路径（以/开头），拼接当前域名
    if (url.startsWith('/')) {
        return window.location.origin + url;
    }

    // 如果是协议相对路径（以//开头），添加当前协议
    if (url.startsWith('//')) {
        return window.location.protocol + url;
    }

    // 其他情况（如相对路径不以/开头），拼接当前完整路径
    // 注意：这可能会导致路径问题，通常建议相对路径以/开头
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    return window.location.origin + basePath + url;
}

// 获取文件url后缀名
export function getFileSuffix(url: string) {
  const lastDotIndex = url.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return '';
  }
  return url.substring(lastDotIndex + 1);
}