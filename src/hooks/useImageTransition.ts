import { useCallback, useEffect, useRef, useState } from "react";

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
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  const animationRef = useRef();
  const startTimeRef = useRef();
  const startPositionRef = useRef(start);

  // 缓动函数
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
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      // 计算当前坐标
      const currentX = startPositionRef.current.x + (end.x - startPositionRef.current.x) * easedProgress;
      const currentY = startPositionRef.current.y + (end.y - startPositionRef.current.y) * easedProgress;
      setPosition({ x: currentX, y: currentY });

      // 计算总距离和当前移动距离
      const totalDistance = calculateDistance(startPositionRef.current, end);
      const currentDistance = calculateDistance(startPositionRef.current, { x: currentX, y: currentY });

      // 根据移动距离判断是否切换图片并添加缩放效果
      const distanceRatio = currentDistance / totalDistance;
      if (distanceRatio >= switchThreshold && currentImage !== endImage) {
        setCurrentImage(endImage);
      }

      // 添加缩放和透明度动画
      if (distanceRatio >= switchThreshold) {
        // 新图片放大进入
        const newImageProgress = (distanceRatio - switchThreshold) / (1 - switchThreshold);
        setScale(0.1 + 0.9 * newImageProgress); // 从 0.1 放大到 1
        setOpacity(newImageProgress);
      } else {
        // 旧图片缩小退出
        const oldImageProgress = distanceRatio / switchThreshold;
        setScale(1 - 0.9 * oldImageProgress); // 从 1 缩小到 0.1
        setOpacity(1 - oldImageProgress);
      }

      // 动画完成
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setIsComplete(true);
        setPosition(end);
        setCurrentImage(endImage);
        setScale(1);
        setOpacity(1);
      }
    },
    [end, duration, switchThreshold, endImage, currentImage]
  );

  // 启动动画
  const startTransition = useCallback(() => {
    // 取消之前的动画（如果存在）
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsAnimating(true);
    setIsComplete(false);
    setCurrentImage(startImage);
    setPosition(start);
    setScale(1);
    setOpacity(1);
    startPositionRef.current = start;
    startTimeRef.current = null;

    animationRef.current = requestAnimationFrame(animate);
  }, [start, startImage, animate]);

  // 清理动画
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    position,
    currentImage,
    isAnimating,
    isComplete,
    startTransition,
    scale,
    opacity,
  };
};