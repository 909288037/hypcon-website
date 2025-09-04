import React, { useState, useEffect, useRef } from 'react';
import './index.less'; // 引入样式文件

const StyledSlotMachine = ({ 
  value, 
  duration = 1500, 
  className = '',
  forceRoll = false 
}) => {
  // 状态管理
  const [isRolling, setIsRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const [rollPosition, setRollPosition] = useState(0);
  const rollerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const prevValueRef = useRef(value);
  const containerRef = useRef(null); // 添加容器引用
  
  // 解析值为数字和符号
  const parseValue = (val) => {
    const str = val.toString();
    const numericPart = parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
    const symbolPart = str.replace(/[0-9]/g, '');
    return { numeric: numericPart, symbol: symbolPart };
  };
  
  // 生成递增的值
  const generateIncrementalValues = (start, end, count = 15) => {
    const values = [];
    const { symbol } = parseValue(value);
    
    // 确保起始值小于结束值
    const minValue = Math.min(start, end);
    const maxValue = Math.max(start, end);
    
    // 生成递增的值
    for (let i = 0; i < count; i++) {
      // 线性插值生成递增值
      const incrementValue = Math.floor(minValue + (maxValue - minValue) * (i / (count - 1)));
      values.push(`${incrementValue}${symbol}`);
    }
    
    return values;
  };
  
  // 开始滚动动画
  const startRolling = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    startTimeRef.current = performance.now();
    
    const startVal = parseValue(prevValueRef.current);
    const targetVal = parseValue(value);
    const incrementalValues = generateIncrementalValues(startVal.numeric, targetVal.numeric);
    
    // 构建滚动内容：当前值 + 递增值 + 目标值
    const rollContent = [
      prevValueRef.current,
      ...incrementalValues,
      value,
      value, // 多加一个目标值确保最终能停在正确位置
    ];
    
    // 设置滚动内容
    if (rollerRef.current) {
      rollerRef.current.innerHTML = rollContent.map(val => 
        `<div class="roll-item">${val}</div>`
      ).join('');
    }
    
    // 计算每个项目的高度（假设所有项目高度相同）
    const itemHeight = rollerRef.current?.firstChild?.offsetHeight || 60;
    const totalHeight = itemHeight * rollContent.length;
    
    // 动画函数
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用缓动函数：开始快，结束慢
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      
      // 计算滚动位置（总高度的大部分，最后停在目标值）
      const position = easeOutProgress * (totalHeight - itemHeight * 2);
      setRollPosition(position);
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // 动画结束，更新显示值并重置状态
        setDisplayValue(value);
        setIsRolling(false);
        prevValueRef.current = value;
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  // 当值变化或需要强制滚动时触发
  useEffect(() => {
    if (value !== prevValueRef.current || forceRoll) {
      startRolling();
    }
  }, [value, forceRoll]);
  
  // 添加尺寸变化监听，更新位置
  useEffect(() => {
    const updatePositionOnResize = () => {
      // 如果正在滚动，不处理尺寸变化
      if (isRolling || !rollerRef.current) return;
      
      // 重新计算位置
      const itemHeight = rollerRef.current?.firstChild?.offsetHeight || 60;
      const rollContentLength = rollerRef.current?.children?.length || 1;
      const totalHeight = itemHeight * rollContentLength;
      
      // 更新位置以适应新的尺寸
      const newPosition = Math.max(0, totalHeight - itemHeight * 2);
      setRollPosition(newPosition);
    };
    
    // 初始化位置
    updatePositionOnResize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', updatePositionOnResize);
    
    // 使用 ResizeObserver 监听容器大小变化 (更精确)
    let resizeObserver;
    if (window.ResizeObserver && containerRef.current) {
      resizeObserver = new ResizeObserver(updatePositionOnResize);
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', updatePositionOnResize);
      if (resizeObserver && containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [isRolling]); // 依赖于 isRolling 状态
  
  // 清理动画
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return (
    <div className={`slot-machine-wrapper ${className}`} ref={containerRef}>
      {/* 老虎机外壳 */}
      <div className="slot-machine-body">
        {/* 老虎机滚筒容器 */}
        <div className="slot-reel">
          <div className="slot-viewport">
            {/* 滚动内容 */}
            <div 
              ref={rollerRef}
              className="roll-content"
              style={{ 
                transform: `translateY(-${rollPosition}px)`,
                willChange: 'transform'
              }}
            >
              <div className="roll-item">
                {displayValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyledSlotMachine;