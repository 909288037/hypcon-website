import React from 'react';

interface LineComponentProps {
  // 起点坐标 (必传)
  startX: number;
  startY: number;

  // 终点坐标 (必传)
  endX: number;
  endY: number;

  // 直线样式 (可选)
  color?: string;
  lineWidth?: number;

  // 容器尺寸 (可选)
  width?: number;
  height?: number;

  // 是否显示坐标点标签 (可选)
  showLabels?: boolean;

  // 是否显示坐标轴 (可选)
  showAxes?: boolean;
}

const LineComponent: React.FC<LineComponentProps> = ({
  startX,
  startY,
  endX,
  endY,
  color = '#3B82F6',
  lineWidth = 2,
  width = 400,
  height = 300,
  showLabels = true,
  showAxes = false,
}) => {
  // 生成坐标轴
  const renderAxes = () => {
    if (!showAxes) return null;

    return (
      <g id="axes">
        {/* X轴和Y轴 */}
        <line
          x1="0"
          y1={height}
          x2={width}
          y2={height}
          stroke="#333"
          strokeWidth="1"
        />
        <line x1="0" y1="0" x2="0" y2={height} stroke="#333" strokeWidth="1" />
      </g>
    );
  };

  // 生成坐标点标签
  const renderLabels = () => {
    if (!showLabels) return null;

    return (
      <g id="labels">
        {/* 起点标签 */}
        <text x={startX + 5} y={startY - 5} fontSize="12" fill="#333">
          ({startX}, {startY})
        </text>

        {/* 终点标签 */}
        <text x={endX + 5} y={endY - 5} fontSize="12" fill="#333">
          ({endX}, {endY})
        </text>
      </g>
    );
  };

  return (
    <svg
      width={width}
      height={height}
      className="border border-gray-200 rounded"
    >
      {renderAxes()}

      {/* 直线 */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={lineWidth}
      />

      {/* 起点标记 */}
      <circle cx={startX} cy={startY} r={4} fill="#ef4444" />

      {/* 终点标记 */}
      <circle cx={endX} cy={endY} r={4} fill="#10b988" />

      {renderLabels()}
    </svg>
  );
};

export default LineComponent;
