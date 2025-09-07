import rightArrowImg from '@/assets/images/right-arrow.png';
import { history } from '@umijs/max';
import React from 'react';
import './index.less';
interface CardProps {
  type?: 'view' | 'download';
  dataSource: any;
  matchOption?: {
    keyword: string;
    color?: string;
  };
}

/**
 * 高亮文本中的关键字
 * @param text - 要处理的文本或HTML字符串
 * @param keywords - 要高亮的关键字（字符串或字符串数组）
 * @param color - 高亮颜色，默认为 '#ff4d4f'
 * @returns 如果输入是HTML，返回高亮后的HTML字符串；否则返回React节点数组
 */
export const highlightKeywords = (
  text: string,
  keywords: string | string[],
  color: string = '#ff4d4f',
): React.ReactNode[] | string => {
  if (!text) return text;

  // 确保 keywords 是数组
  const words = Array.isArray(keywords) ? keywords : [keywords];
  const validWords = words
    .filter((word) => word && word.trim().length > 0)
    .map((w) => w.trim());

  // 无有效关键字，直接返回原文本
  if (validWords.length === 0) {
    return [text];
  }

  // 转义正则表达式特殊字符
  const escapeRegExp = (str: string): string => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // 构建不区分大小写的正则表达式，匹配所有关键字
  const pattern = validWords.map((word) => `(${escapeRegExp(word)})`).join('|');
  const regex = new RegExp(pattern, 'gi'); // 'g' 全局匹配，'i' 忽略大小写

  // 检测是否包含 HTML 标签
  if (/<[^>]*>/.test(text)) {
    // 处理富文本：返回 HTML 字符串
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const body = doc.body;

    /**
     * 递归遍历并高亮文本节点
     */
    const highlightNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const nodeText = node.textContent || '';
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        const fragment = document.createDocumentFragment();

        while ((match = regex.exec(nodeText)) !== null) {
          // 添加匹配前的文本
          if (match.index > lastIndex) {
            fragment.appendChild(
              document.createTextNode(nodeText.slice(lastIndex, match.index)),
            );
          }

          // 创建高亮 span 元素
          const span = document.createElement('span');
          span.textContent = match[0];
          span.style.color = color;
          span.style.fontWeight = 'bold';
          // 可选：添加 class 便于样式控制
          span.className = 'highlighted-keyword';
          fragment.appendChild(span);

          lastIndex = match.index + match[0].length;
        }

        // 添加剩余文本
        if (lastIndex < nodeText.length) {
          fragment.appendChild(
            document.createTextNode(nodeText.slice(lastIndex)),
          );
        }

        // 替换原始文本节点
        if (fragment.childNodes.length > 0 && node.parentNode) {
          node.parentNode.replaceChild(fragment, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 递归处理子节点
        Array.from(node.childNodes).forEach((child) => {
          highlightNode(child);
        });
      }
    };

    // ✅ 关键：直接遍历并修改 body 下的每个子节点（不克隆，不追加）
    Array.from(body.childNodes).forEach((node) => {
      highlightNode(node);
    });

    // 序列化 body 内容并移除 <body> 标签
    const serializer = new XMLSerializer();
    let resultHTML = serializer.serializeToString(body);

    // 移除首尾的 <body> 和 </body>
    resultHTML = resultHTML
      .replace(/^<body[^>]*>/i, '')
      .replace(/<\/body>$/i, '')
      .trim();

    return resultHTML;
  } else {
    // 处理纯文本：返回 React 节点数组
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      // 添加匹配前的文本
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // 添加高亮关键字
      parts.push(
        <span
          key={match.index}
          style={{ color, fontWeight: 'bold' }}
          className="highlighted-keyword"
        >
          {match[0]}
        </span>,
      );

      lastIndex = match.index + match[0].length;
    }

    // 添加剩余文本
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }
};
const Card: React.FC<CardProps> = ({
  type = 'view',
  dataSource,
  matchOption,
}) => {
  if (type === 'download') {
    return (
      <div
        className="card-download"
        onClick={() => {
          if (dataSource.detailType === '0') {
            history.push(
              `/download/?search=${dataSource.name}&fileCategoryId=${dataSource.categoryId}&id=${dataSource.id}`,
            );
            return;
          }
          // 跳转软件详情
          if (dataSource.type === '0') {
            history.push(`/product/${dataSource.type}/${dataSource.id}`);
          } else if (dataSource.type === '1') {
            // 跳转硬件详情
            history.push(
              `/product-hardware/${dataSource.type}/${dataSource.id}`,
            );
          }
        }}
      >
        <div className="card-download-header">
          <img src={dataSource?.image} alt="" />
        </div>
        <div className="card-download-body">
          <div className="card-download-body-title">{dataSource?.name}</div>
          <div
            className="card-download-body-desc ql-editor"
            dangerouslySetInnerHTML={{
              __html: dataSource?.description,
            }}
          ></div>
        </div>
        <div className="card-download-btn"></div>
      </div>
    );
  }
  return (
    <div
      className="card"
      onClick={() => {
        // 跳转软件详情
        if (dataSource.type === '0') {
          history.push(`/product/${dataSource.type}/${dataSource.id}`);
        } else if (dataSource.type === '1') {
          // 跳转硬件详情
          history.push(`/product-hardware/${dataSource.type}/${dataSource.id}`);
        }
      }}
    >
      <div className="card-header">
        <img src={dataSource?.image} alt="" />
      </div>
      <div className="card-body">
        <div className="card-body-title">
          {matchOption
            ? highlightKeywords(dataSource?.name, matchOption.keyword)
            : dataSource?.name}
        </div>
        <div
          className="card-body-desc ql-editor"
          dangerouslySetInnerHTML={{
            __html: matchOption
              ? highlightKeywords(dataSource?.description, matchOption?.keyword)
              : dataSource?.description,
          }}
        ></div>
      </div>
      <div className="card-footer">
        <div className="card-footer-btn">
          <img src={rightArrowImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Card;
