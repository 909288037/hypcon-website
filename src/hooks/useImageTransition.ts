// useImageTransition.js
import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * 自定义 Hook：实现图片从起点平滑移动到终点，并在接近终点时切换图片
 * @param {Object} start - 起点坐标 { x, y }
 * @param {Object} end - 终点坐标 { x, y }
 * @param {string} startImage - 起点图片 URL
 * @param {string} endImage - 终点图片 URL
 * @param {number} [duration=1000] - 动画总时长 (毫秒)
 * @param {number} [switchThreshold=0.7] - 图片切换阈值 (0-1)，表示移动距离的百分比
 * @returns {Object} 包含动画状态和控制方法的对象
 */
export const useImageTransition = ({
  start,
  end,
  startImage,
  endImage,
  duration = 1000,
  switchThreshold = 0.7,
}) => {
  const [position, setPosition] = useState(start);
  const [currentImage, setCurrentImage] = useState(startImage);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const animationRef = useRef();
  const startTimeRef = useRef();
  const startPositionRef = useRef(start);

  // 缓动函数：easeOutQuad (开始快，结束慢)
  const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);

  // 计算两点间距离
  const calculateDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  // 动画帧函数
  const animate = useCallback(
    (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1); // 归一化进度 [0, 1]
      const easedProgress = easeOutQuad(progress);

      // 计算当前坐标
      const currentX = startPositionRef.current.x + (end.x - startPositionRef.current.x) * easedProgress;
      const currentY = startPositionRef.current.y + (end.y - startPositionRef.current.y) * easedProgress;
      setPosition({ x: currentX, y: currentY });

      // 计算总距离和当前移动距离
      const totalDistance = calculateDistance(startPositionRef.current, end);
      const currentDistance = calculateDistance(startPositionRef.current, { x: currentX, y: currentY });

      // 根据移动距离判断是否切换图片
      if (currentDistance / totalDistance >= switchThreshold && currentImage !== endImage) {
        setCurrentImage(endImage);
      }

      // 动画完成
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setIsComplete(true);
        // 确保最终位置精确
        setPosition(end);
        setCurrentImage(endImage);
      }
    },
    [end, duration, switchThreshold, startImage, endImage, currentImage]
  );

  // 启动动画
  const startTransition = useCallback(() => {
    if (isAnimating || isComplete) return; // 防止重复启动

    setIsAnimating(true);
    setIsComplete(false);
    setCurrentImage(startImage);
    setPosition(start);
    startPositionRef.current = start;
    startTimeRef.current = null;

    animationRef.current = requestAnimationFrame(animate);
  }, [start, startImage, animate, isAnimating, isComplete]);

  // 清理动画
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // 暴露给使用者的 API
  return {
    position,
    currentImage,
    isAnimating,
    isComplete,
    startTransition, // 调用此函数开始动画
  };
};