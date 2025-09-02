import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
// 引入 ECharts 中国地图 JSON 数据（建议本地导入，避免跨域问题）
import chinaGeoJson from '@/assets/map/geoGpsMap.json'; // 需自行准备 china.json 地图数据文件
import './index.less';
const targetCities = [
  '北京',
  '石家庄',
  //   '华中大区',
  '西安',
  '成都',
  '重庆',
  '上海',
  '杭州',
  '武汉',
  //   '河南',
  //   '湖北',
  //   '湖南',
  //   '安徽',
  '广东',
  '深圳',
  '珠海',
];
const valueData: any = {};
targetCities.forEach((city) => {
  if (city === '杭州') {
    valueData[city] = 30000;
    return;
  }
  valueData[city] = 10000;
});

// React 组件
const ChinaMapChart = () => {
  // 1. 定义 ECharts 实例引用（替代 jQuery 的 DOM 选择器）
  const chartRef = useRef(null);
  let myChart = useRef(null);

  // 2. 原代码中的配置数据（直接迁移并适配 React 语法）
  // 地理坐标映射
  const geoCoordMap = {
    北京: [116.405285, 39.904989],
    石家庄: [114.502461, 38.045474],
    西安: [108.948024, 34.263159],
    成都: [104.065735, 30.659462],
    重庆: [106.550464, 29.563226],
    上海: [121.473701, 31.230416],
    杭州: [120.15507, 30.274084],
    武汉: [114.305419, 30.592977],
    广东: [113.264385, 23.12911],
    深圳: [114.057931, 22.543096],
    珠海: [113.52185, 22.27893],
    // 华中大区: [113.665412, 34.757975],
    // 河南: [113.665412, 34.757975],
    // 湖北: [114.305419, 30.592977],
    // 湖南: [112.982279, 28.19409],
    // 安徽: [117.283042, 31.86119],
  };

  const provinceColors: any = {
    北京: '#FF0000',
    上海: '#00FF00',
    广东: '#0000FF',
    浙江: '#FFFF00',
    江苏: '#FF00FF',
    山东: '#00FFFF',
    河南: '#FFA500',
    河北: '#800080',
    湖南: '#FFC0CB',
    湖北: '#40E0D0',
    安徽: '#9370DB',
    // 可以为更多省份添加颜色
    // 默认颜色
    default: '#ccc',
  };
  const cityToProvinceMap: any = {
    武汉: ['河南', '湖北', '湖南', '安徽'],
    // 可以添加更多城市的映射关系
  };
  // 中心点坐标（杭州）
  const geoGpsMap = [120.15507, 30.274084];
  const colors = '#25CEF3';

  // 3. 数据处理函数（原代码中的 convertData / convertToLineData）
  const convertData = (data) => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const geoCoord = geoCoordMap[data[i].name];
      //  过滤河南 湖北 湖南 安徽
      // if (["河南", "安徽" , "湖南" , "湖北"].includes(data[i].name)) {
      //   continue;
      // }
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value), // 拼接 [经度, 纬度, 数值]
        });
      }
    }
    return res;
  };

  // 分离杭州和其他城市的数据
  const separateHangzhouData = (data) => {
    const hangzhouData = [];
    const hzdqData = [];
    const otherData = [];

    data.forEach((item) => {
      if (item.name === '杭州') {
        hangzhouData.push(item);
      } else {
        if (['河南', '安徽', '湖南', '湖北', '华中大区'].includes(item.name)) {
          hzdqData.push(item);
          return;
        }
        otherData.push(item);
      }
    });

    return { hangzhouData, hzdqData, otherData };
  };

  const convertToLineData = (data, gps) => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      const toCoord = geoCoordMap[dataItem.name];
      const fromCoord = gps; // 起点坐标（杭州）
      if (fromCoord && toCoord) {
        res.push([
          { coord: fromCoord, value: dataItem.value }, // 起点
          { coord: toCoord }, // 终点
        ]);
      }
    }
    return res;
  };

  // 4. 初始化地图数据（原代码中的 mapData 构建）
  const getMapData = () => {
    const mapData = [];
    // 遍历省份构建数据
    for (const key in geoCoordMap) {
      mapData.push({
        year: '杭州',
        name: key,
        value: valueData[key] / 100, // 数值缩放
        value1: valueData[key] / 100,
      });
    }
    // 按数值排序（原代码逻辑）
    mapData.sort((a, b) => a.value - b.value);
    return mapData;
  };

  // 5. ECharts 初始化（核心逻辑，替代 jQuery 的 $(function() {})）
  useEffect(() => {
    // 初始化 ECharts 实例（确保 DOM 已挂载）
    if (chartRef.current && !myChart.current) {
      myChart.current = echarts.init(chartRef.current);

      // 注册中国地图（原代码中的 $.getJSON 逻辑，改为本地导入避免跨域）
      echarts.registerMap('china', chinaGeoJson);

      // 构建地图数据
      const mapData = getMapData();
      const sortedMapData = mapData
        .sort((a, b) => b.value - a.value)
        .slice(0, 20);
      const { hangzhouData, otherData, hzdqData } =
        separateHangzhouData(sortedMapData);

      // ECharts 配置项（原代码中的 optionXyMap01）
      const option = {
        backgroundColor: 'transparent',
        geo: {
          show: true,
          map: 'china',
          roam: false, // 允许缩放和平移
          zoom: 1,
          //   center: geoGpsMap, // 地图中心点（
          label: {
            emphasis: { show: false },
          },
          itemStyle: {
            normal: {
              borderColor: 'transparent',
              borderWidth: 1,
              areaColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#E7F5FD', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#E0F2FE', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              shadowColor: '#96BBDA',
              shadowOffsetX: 0,
              shadowOffsetY: 5,
              shadowBlur: 5,
            },
            emphasis: {
              areaColor: '#ABE1FF',
              //   borderWidth: 0,
            },
          },
        },
        series: [
          // 1. 基础地图层
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75, // 长宽比
            showLegendSymbol: false,
            label: {
              normal: { show: false },
              emphasis: {
                show: false,
                textStyle: { color: '#fff' },
              },
            },
            roam: true,
            animation: false,
          },
          // 2. 其他城市的散点动画层
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(otherData),
            symbolSize: function (val: any) {
              return val[2] / 10;
            }, // 散点大小随数值变化
            showEffectOn: 'render',
            rippleEffect: { brushType: 'stroke' },
            hoverAnimation: true,
            label: {
              normal: {
                // 使用富文本格式化，根据不同城市设置不同字体大小
                formatter: function (params: any) {
                  return `{other|${params.name}}`;
                },
                position: 'top', // 其他城市标签在上方
                show: true,
                // 定义富文本样式
                rich: {
                  other: {
                    color: '#007ECA',
                    fontSize: 16,
                    fontWeight: 'bold',
                  },
                },
              },
            },
            itemStyle: {
              normal: {
                color: colors,
                shadowBlur: 10,
                shadowColor: colors,
              },
            },
            zlevel: 1,
          },
          // 3. 杭州的散点动画层
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(hangzhouData),
            symbolSize: function (val: any) {
              return val[2] / 10;
            }, // 散点大小随数值变化
            showEffectOn: 'render',
            rippleEffect: { brushType: 'fill' },
            hoverAnimation: true,
            label: {
              normal: {
                // 使用富文本格式化，根据不同城市设置不同字体大小
                formatter: function (params: any) {
                  return `{hz|${params.name}}`;
                },
                position: 'right', // 杭州标签在右侧
                show: true,
                // 定义富文本样式
                rich: {
                  hz: {
                    color: '#007ECA',
                    fontSize: 24,
                    fontWeight: 'bold',
                  },
                },
              },
            },
            itemStyle: {
              normal: {
                color: colors,
                shadowBlur: 10,
                shadowColor: colors,
              },
            },
            zlevel: 1,
          },
          // 4. 连线动画层
          {
            name: 'lines',
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 4, // 箭头速度（越小越快）
              trailLength: 0.2, // 尾迹长度
              symbol: 'arrow', // 箭头图标
              symbolSize: 5, // 图标大小
            },
            lineStyle: {
              normal: {
                color: colors,
                width: 1, // 线条宽度
                opacity: 1, // 透明度
                curveness: 0.1, // 线条曲度
              },
            },
            data: convertToLineData(mapData, geoGpsMap),
          },
        ],
      };

      // 设置配置项并渲染
      myChart.current.setOption(option);

      let originalEffectScatterOption: any = null;
      let originalLinesOption: any = null;

      // 添加鼠标事件监听器
      myChart.current.on('mouseover', function (params: any) {
        if (
          params.componentType === 'series' &&
          (params.seriesType === 'effectScatter' ||
            params.seriesType === 'scatter')
        ) {
          // 保存原始配置
          if (!originalEffectScatterOption) {
            originalEffectScatterOption = myChart.current
              .getOption()
              .series.find((s: any) => s.type === 'effectScatter');
          }

          if (!originalLinesOption) {
            originalLinesOption = myChart.current
              .getOption()
              .series.find((s: any) => s.type === 'lines');
          }

          // 停止涟漪效果
          myChart.current.setOption({
            series: myChart.current.getOption().series.map((s: any) => {
              if (s.type === 'effectScatter') {
                return {
                  ...s,
                  showEffectOn: 'none', // 停止涟漪效果
                };
              }
              if (s.type === 'lines') {
                return {
                  ...s,
                  effect: {
                    ...s.effect,
                    show: false,
                  },
                };
              }
              return s;
            }),
          });

          // 高亮相关省份
          const cityName = params.name;
          const provincesToHighlight = cityToProvinceMap[cityName];
          if (provincesToHighlight) {
            provincesToHighlight.forEach((province: string) => {
              myChart.current.dispatchAction({
                type: 'highlight',
                name: province,
              });
            });
          }
        }
      });

      myChart.current.on('mouseout', function (params: any) {
        if (
          params.componentType === 'series' &&
          (params.seriesType === 'effectScatter' ||
            params.seriesType === 'scatter')
        ) {
          // 恢复涟漪效果
          myChart.current.setOption({
            series: myChart.current.getOption().series.map((s: any) => {
              if (s.type === 'effectScatter') {
                return {
                  ...s,
                  showEffectOn: 'render', // 恢复涟漪效果
                };
              }
              if (s.type === 'lines') {
                return {
                  ...s,
                  effect: {
                    ...s.effect,
                    show: true,
                  },
                };
              }
              return s;
            }),
          });

          // 取消高亮相关省份
          const cityName = params.name;
          const provincesToHighlight = cityToProvinceMap[cityName];
          if (provincesToHighlight) {
            provincesToHighlight.forEach((province: string) => {
              myChart.current.dispatchAction({
                type: 'downplay',
                name: province,
              });
            });
          }
        }
      });
    }

    // 6. 窗口 resize 适配（优化体验）
    const handleResize = () => {
      myChart.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    // 7. 组件卸载时清理（避免内存泄漏）
    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.current?.dispose();
      myChart.current = null;
    };
  }, []);

  // 8. 渲染 DOM（地图容器）
  return <div className="map-container" ref={chartRef} />;
};

export default ChinaMapChart;
