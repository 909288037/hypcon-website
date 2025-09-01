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
        const response = await fetch(imageUrl);
        
        // 检查响应是否成功
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // 2. 将响应转换为 Blob 对象
        const blob = await response.blob();
        
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

