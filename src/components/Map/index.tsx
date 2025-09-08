import chinaGeoJson from '@/assets/map/geoGpsMap.json';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import './index.less';
// 导入自定义图标
import hangzhouIcon from './map-marker-radius.png';

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
  南京: [118.797766, 32.060826],
};

// 省份中心点坐标
const provinceCenterMap = {
  河南: [113.665412, 34.747253],
  湖北: [114.305419, 30.592977],
  湖南: [112.982279, 28.112342],
  安徽: [117.283042, 31.86119],
  四川: [104.065735, 30.659462],
  贵州: [106.713478, 26.578343],
  广西: [108.320004, 22.82402],
  云南: [102.718327, 25.045808],
  西藏: [91.132212, 29.660361],
  重庆: [106.550464, 29.563226],
  陕西: [108.948024, 34.263159],
  甘肃: [103.83417, 36.061102],
  宁夏: [106.23248, 38.486111],
  青海: [101.779747, 36.617291],
  新疆: [87.617733, 43.792818],
  北京: [116.405285, 39.904989],
  天津: [117.190182, 39.125596],
  河北: [114.502461, 38.045474],
  山西: [112.549248, 37.857014],
  内蒙古: [111.670801, 40.818311],
  辽宁: [123.429096, 41.805554],
  吉林: [125.324501, 43.886841],
  黑龙江: [126.637504, 45.803775],
  广东: [113.264385, 23.12911],
  福建: [119.295896, 26.099061],
  江西: [115.858197, 28.682009],
  海南: [110.359374, 20.044226],
  江苏: [118.797766, 32.060826],
  山东: [117.000923, 36.675807],
  上海: [121.473701, 31.230416],
  浙江: [120.15507, 30.274084],
};

// 大区映射
const provinceToRegionMap = {
  四川: '西南大区',
  贵州: '西南大区',
  广西: '西南大区',
  云南: '西南大区',
  西藏: '西南大区',
  重庆: '西南大区',
  河南: '华中大区',
  湖北: '华中大区',
  湖南: '华中大区',
  安徽: '华中大区',
  陕西: '西北大区',
  甘肃: '西北大区',
  宁夏: '西北大区',
  青海: '西北大区',
  新疆: '西北大区',
  北京: '华北大区',
  天津: '华北大区',
  河北: '华北大区',
  山西: '华北大区',
  内蒙古: '华北大区',
  辽宁: '华北大区',
  吉林: '华北大区',
  黑龙江: '华北大区',
  广东: '华南大区',
  福建: '华南大区',
  江西: '华南大区',
  海南: '华南大区',
  江苏: '华东大区',
  山东: '华东大区',
  上海: '华东大区',
  浙江: '浙江大区',
};

// 大区省份列表映射
const regionToProvincesMap: Record<string, string[]> = {
  西南大区: ['四川', '贵州', '广西', '云南', '西藏', '重庆'],
  华中大区: ['河南', '湖北', '湖南', '安徽'],
  西北大区: ['陕西', '甘肃', '宁夏', '青海', '新疆'],
  华北大区: [
    '北京',
    '天津',
    '河北',
    '山西',
    '内蒙古',
    '辽宁',
    '吉林',
    '黑龙江',
  ],
  华南大区: ['广东', '福建', '江西', '海南'],
  华东大区: ['江苏', '山东', '上海'],
  浙江大区: ['浙江'],
};

// === 修改：定义一个蓝色调色板，用于区分大区内省份 ===
const blueShades = [
  '#ABE1FF', // 蓝色 1
  '#C0E9FF', // 蓝色 2
  '#8DD4FF', // 蓝色 3
  '#9AE2FF', // 蓝色 4
];

// 大区中心点坐标 (可以根据实际需要调整)
const regionCenterMap: Record<string, [number, number]> = {
  西南大区: [102.5, 29.0], // 调整位置
  华中大区: [113.0, 31.0], // 调整位置
  西北大区: [95.0, 38.0],
  华北大区: [115.5, 39.5],
  华南大区: [113.0, 23.0], // 调整位置
  华东大区: [119.0, 32.5],
  浙江大区: [120.15507, 30.274084], // 杭州坐标
};

const targetCities = Object.keys(geoCoordMap);
const valueData: any = {};
targetCities.forEach((city) => {
  valueData[city] = city === '杭州' ? 30000 : 10000;
});

// React 组件
const ChinaMapChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  let myChart = useRef<echarts.EChartsType | null>(null);
  const originalEffects = useRef({
    effectScatter: [] as any[],
    linesEffectShow: true,
  });
  const regionLabelSeriesId = useRef(
    'region-label-series-' + Math.random().toString(36).slice(2, 9),
  );
  // 省份标签系列ID - 不再使用，但保留ID以防万一
  const provinceLabelSeriesId = useRef(
    'province-label-series-' + Math.random().toString(36).slice(2, 9),
  );
  // 杭州图标系列ID - 新增
  const hangzhouIconSeriesId = useRef(
    'hangzhou-icon-series-' + Math.random().toString(36).slice(2, 9),
  );
  // 当前高亮的大区
  const highlightedRegion = useRef<string | null>(null);
  // 存储大区的原始颜色，用于恢复
  const regionOriginalColors = useRef<Record<string, any>>({});
  // 用于存储定时器ID，以便可以取消
  const labelHideTimeout = useRef<NodeJS.Timeout | null>(null);

  // 存储初始 regions 配置（台湾/南海诸岛等隐藏规则）
  const initialRegions = useRef([
    {
      name: '台湾',
      itemStyle: { opacity: 0, borderWidth: 0 },
      label: { show: false, emphasis: { show: false } },
    },
    {
      name: '南海诸岛',
      itemStyle: { opacity: 0, borderWidth: 0 },
      label: { show: false, emphasis: { show: false } },
    },
    {
      name: '香港',
      itemStyle: { opacity: 0, borderWidth: 0 },
      label: { show: false, emphasis: { show: false } },
    },
    {
      name: '澳门',
      itemStyle: { opacity: 0, borderWidth: 0 },
      label: { show: false, emphasis: { show: false } },
    },
  ]);

  const geoGpsMap = [120.15507, 30.274084];
  const colors = '#1D94C9';
  // 高亮颜色配置
  const highlightColor = '#ABE2FF';
  const normalColor = {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: '#E7F5FD' },
      { offset: 1, color: '#E0F2FE' },
    ],
    global: false,
  };

  // 数据处理函数
  const convertData = (data: any[]) => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  };

  const separateHangzhouData = (data: any[]) => {
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

  const convertToLineData = (data: any[], gps: number[]) => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      const toCoord = geoCoordMap[dataItem.name];
      const fromCoord = gps;
      if (fromCoord && toCoord) {
        res.push([
          { coord: fromCoord, value: dataItem.value },
          { coord: toCoord },
        ]);
      }
    }
    return res;
  };

  const getMapData = () => {
    const mapData = [];
    for (const key in geoCoordMap) {
      mapData.push({
        year: '杭州',
        name: key,
        value: valueData[key] / 100,
        value1: valueData[key] / 100,
      });
    }
    mapData.sort((a, b) => a.value - b.value);
    return mapData;
  };

  // 高亮指定大区
  const highlightRegion = (regionName: string) => {
    if (!myChart.current || !regionName) return;

    highlightedRegion.current = regionName;
    const option = myChart.current.getOption() as echarts.EChartsOption;
    const newGeo = JSON.parse(JSON.stringify(option.geo?.[0] || {}));

    // 保留初始regions配置（台湾/南海诸岛等隐藏规则）
    newGeo.regions = [...initialRegions.current];

    const provincesInRegion = regionToProvincesMap[regionName] || [];
    // const highlightColorForRegion =
    //   regionHighlightColors[regionName] || highlightColor; // 不再使用统一颜色

    provincesInRegion.forEach((province, index) => {
      if (!regionOriginalColors.current[province]) {
        // 假设初始状态是 normalColor 和 transparent border
        regionOriginalColors.current[province] = {
          areaColor: normalColor,
          borderColor: 'transparent',
        };
      }

      // === 修改：为每个省份选择不同的蓝色 ===
      const colorIndex = index % blueShades.length;
      const provinceHighlightColor = blueShades[colorIndex];

      // 追加高亮省份配置
      newGeo.regions.push({
        name: province,
        itemStyle: {
          areaColor: provinceHighlightColor, // 使用不同的蓝色
          borderColor: '#007ECA',
          borderWidth: 0,
          shadowColor: 'rgba(0, 126, 202, 0.5)',
          shadowBlur: 0,
        },
      });
    });

    myChart.current.setOption({ geo: [newGeo] }, false); // 不合并，替换整个geo配置
  };

  // 清除大区高亮
  const clearRegionHighlight = () => {
    if (!myChart.current || !highlightedRegion.current) return;

    const option = myChart.current.getOption() as echarts.EChartsOption;
    const newGeo = JSON.parse(JSON.stringify(option.geo?.[0] || {}));

    // 恢复为初始regions配置
    newGeo.regions = [...initialRegions.current];

    myChart.current.setOption({ geo: [newGeo] }, false); // 不合并
    highlightedRegion.current = null;
  };

  // 显示大区名称标签
  const showRegionLabel = (regionName: string) => {
    if (!myChart.current || !regionName) return;

    const centerCoord = regionCenterMap[regionName] || [0, 0];

    // 清除之前的隐藏定时器
    if (labelHideTimeout.current) {
      clearTimeout(labelHideTimeout.current);
      labelHideTimeout.current = null;
    }

    myChart.current.setOption(
      {
        series: [
          {
            id: regionLabelSeriesId.current,
            data: [
              {
                name: regionName,
                value: centerCoord,
              },
            ],
            label: {
              normal: {
                show: true,
                formatter: regionName,
                fontSize: 24,
                fontWeight: 'bold',
                color: '#005689',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: [5, 10],
                borderRadius: 4,
                // 尝试避免与点重叠的策略，这里简化为使用预设的偏移坐标
                // 更复杂的策略需要计算附近点的位置，这里暂不实现
                // 可以考虑使用 offset 或 rich text 的 position 等属性微调
              },
            },
          },
        ],
      },
      false,
    ); // 不合并
  };

  // 隐藏大区名称标签
  const hideRegionLabel = () => {
    if (!myChart.current) return;

    // 设置一个短暂的延迟再隐藏，避免鼠标快速移动时标签闪烁
    if (labelHideTimeout.current) {
      clearTimeout(labelHideTimeout.current);
    }
    labelHideTimeout.current = setTimeout(() => {
      myChart.current?.setOption(
        {
          series: [
            {
              id: regionLabelSeriesId.current,
              label: {
                normal: {
                  show: false,
                },
              },
            },
          ],
        },
        false,
      ); // 不合并
      labelHideTimeout.current = null;
    }, 200); // 200ms 延迟
  };

  useEffect(() => {
    if (chartRef.current && !myChart.current) {
      myChart.current = echarts.init(chartRef.current);
      echarts.registerMap('china', chinaGeoJson);

      const mapData = getMapData();
      const sortedMapData = mapData
        .sort((a, b) => b.value - a.value)
        .slice(0, 20);
      const { hangzhouData, otherData } = separateHangzhouData(sortedMapData);

      // 定义涟漪效果配置
      const otherCityRipple = { brushType: 'stroke', period: 4, scale: 2.5 };
      const hangzhouRipple = { brushType: 'fill', period: 3, scale: 3 };

      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        geo: {
          show: true,
          map: 'china',
          roam: false,
          zoom: 1,
          layoutCenter: ['51%', '43%'], //地图位置
          layoutSize: '70%',
          // 使用初始regions配置
          regions: [...initialRegions.current],
          label: {
            emphasis: {
              show: true, // 悬停时显示省份标签
              fontSize: 14,
              color: '#007ECA',
              fontWeight: 'bold',
              lineHeight: 20,
            },
          },
          itemStyle: {
            normal: {
              borderColor: 'transparent',
              borderWidth: 1,
              areaColor: normalColor,
              shadowColor: '#96BBDA',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 0,
            },
            emphasis: {
              areaColor: highlightColor,
              borderColor: '#007ECA',
              borderWidth: 0,
            },
          },
        },
        series: [
          // 基础地图层
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            showLegendSymbol: false,
            label: {
              normal: { show: false },
              emphasis: {
                show: true,
                textStyle: {
                  color: '#000',
                  fontSize: 14,
                  fontWeight: 'bold',
                },
                formatter: function (params: any) {
                  const region = provinceToRegionMap[params.name];
                  return region ? `${params.name}\n${region}` : params.name;
                },
              },
            },
            roam: true,
            animation: false,
          },
          // 其他城市的散点动画层
          {
            type: 'effectScatter',
            id: 'otherCities',
            coordinateSystem: 'geo',
            data: convertData(otherData),
            symbolSize: function (val: any) {
              return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: otherCityRipple,
            hoverAnimation: true,
            label: {
              normal: {
                formatter: function (params: any) {
                  return `{other|${params.name}}`;
                },
                position: 'top',
                show: true,
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
          // 杭州的散点动画层（保留原有的涟漪效果）
          {
            type: 'effectScatter',
            id: 'hangzhou',
            coordinateSystem: 'geo',
            data: convertData(hangzhouData),
            symbolSize: function (val: any) {
              return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: hangzhouRipple, // 保留原有的涟漪效果
            hoverAnimation: true,
            label: {
              normal: {
                formatter: function (params: any) {
                  return `{hz|${params.name}}`;
                },
                position: 'right',
                show: true,
                rich: {
                  hz: {
                    color: '#0055FF',
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
            zlevel: 1, // 低于图标层，确保涟漪在图标下方
          },
          // 杭州的自定义图标层（新增，无涟漪效果）
          {
            type: 'scatter', // 使用普通散点图而非动态散点图
            id: hangzhouIconSeriesId.current,
            coordinateSystem: 'geo',
            data: convertData(hangzhouData), // 使用相同的杭州数据
            symbol: `image://${hangzhouIcon}`, // 自定义图标
            symbolSize: 26, // 图标大小
            symbolOffset: [0, 0], // 图标偏移调整
            label: {
              normal: {
                show: false, // 不显示额外标签，避免重复
              },
            },
            zlevel: 5, // 高于涟漪层，确保图标在涟漪上方显示
          },
          // 连线动画层
          {
            name: 'lines',
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 4,
              trailLength: 0.2,
              symbol: 'arrow',
              symbolSize: 5,
            },
            lineStyle: {
              normal: {
                color: colors,
                width: 1,
                opacity: 0.2,
                curveness: -0.2,
              },
            },
            data: convertToLineData(mapData, geoGpsMap),
          },
          // 大区名称标签层
          {
            id: regionLabelSeriesId.current,
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [], // 初始为空
            symbolSize: 0,
            label: {
              normal: {
                show: false, // 初始隐藏
                fontSize: 24,
                fontWeight: 'bold',
                color: '#005689',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: [5, 10],
                borderRadius: 4,
              },
            },
            zlevel: 3,
          },
          {
            id: provinceLabelSeriesId.current,
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 0,
            label: {
              normal: {
                show: false,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#005689',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: [3, 8],
                borderRadius: 2,
              },
            },
            zlevel: 3,
          },
        ],
      };

      myChart.current.setOption(option);

      // 保存原始效果配置
      const initialOption = myChart.current.getOption();
      originalEffects.current.effectScatter =
        initialOption.series
          ?.filter((s: any) => s.type === 'effectScatter')
          .map((s: any) => ({
            id: s.id,
            showEffectOn: s.showEffectOn,
            rippleEffect: s.rippleEffect,
          })) || [];
      originalEffects.current.linesEffectShow = true;

      // ===== 修改后的事件监听逻辑 =====

      // 鼠标悬停事件 - 监听地图区域 (map series)
      myChart.current.on(
        'mouseover',
        { seriesType: 'map' },
        function (params: any) {
          // console.log("Mouse over province:", params); // 调试用
          if (
            params.componentType === 'series' &&
            params.seriesType === 'map'
          ) {
            const provinceName = params.name;
            const regionName = provinceToRegionMap[provinceName];

            // 停止涟漪效果
            myChart.current?.setOption(
              {
                series: myChart.current.getOption().series?.map((s: any) => {
                  if (s.type === 'effectScatter') {
                    return {
                      ...s,
                      rippleEffect: { ...s.rippleEffect, period: 0 },
                    };
                  }
                  if (s.type === 'lines') {
                    return {
                      ...s,
                      lineStyle: { ...s.lineStyle, normal: { width: 0 } },
                      effect: { ...s.effect, show: false },
                    };
                  }
                  return s;
                }),
              },
              false,
            ); // 不合并

            // 高亮大区并显示大区名称
            if (regionName) {
              highlightRegion(regionName);
              showRegionLabel(regionName);
            }
          }
        },
      );

      // 鼠标离开事件 - 监听地图区域 (map series)
      myChart.current.on(
        'mouseout',
        { seriesType: 'map' },
        function (params: any) {
          // console.log("Mouse out province:", params); // 调试用
          if (
            params.componentType === 'series' &&
            params.seriesType === 'map'
          ) {
            // 恢复涟漪效果
            const currentOption = myChart.current?.getOption();
            myChart.current?.setOption(
              {
                series: currentOption?.series?.map((s: any) => {
                  if (s.type === 'effectScatter') {
                    const original = originalEffects.current.effectScatter.find(
                      (orig) => orig.id === s.id,
                    );
                    if (original) {
                      return {
                        ...s,
                        showEffectOn: original.showEffectOn,
                        rippleEffect: original.rippleEffect,
                      };
                    }
                    return s;
                  }
                  if (s.type === 'lines') {
                    return {
                      ...s,
                      lineStyle: {
                        normal: {
                          color: colors,
                          width: 1,
                          opacity: 0.2,
                          curveness: -0.2,
                        },
                      },
                      effect: {
                        ...s.effect,
                        show: originalEffects.current.linesEffectShow,
                      },
                    };
                  }
                  return s;
                }),
              },
              false,
            ); // 不合并

            clearRegionHighlight();
            hideRegionLabel(); // 触发隐藏逻辑
          }
        },
      );
    }

    // 窗口大小调整处理
    const handleResize = () => {
      myChart.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    // 组件卸载清理
    return () => {
      window.removeEventListener('resize', handleResize);
      if (labelHideTimeout.current) {
        clearTimeout(labelHideTimeout.current);
      }
      myChart.current?.dispose();
      myChart.current = null;
    };
  }, []);

  return <div className="map-container" ref={chartRef} />;
};

export default ChinaMapChart;
