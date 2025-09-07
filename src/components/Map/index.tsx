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

const targetCities = Object.keys(geoCoordMap);
const valueData: any = {};
targetCities.forEach((city) => {
  valueData[city] = city === '杭州' ? 30000 : 10000;
});

// React 组件
const ChinaMapChart = () => {
  const chartRef = useRef(null);
  let myChart = useRef(null);
  const originalEffects = useRef({
    effectScatter: [],
    linesEffectShow: true,
  });
  const regionLabelSeriesId = useRef(
    'region-label-series-' + Math.random().toString(36).slice(2, 9),
  );
  // 省份标签系列ID
  const provinceLabelSeriesId = useRef(
    'province-label-series-' + Math.random().toString(36).slice(2, 9),
  );
  // 杭州图标系列ID - 新增
  const hangzhouIconSeriesId = useRef(
    'hangzhou-icon-series-' + Math.random().toString(36).slice(2, 9),
  );
  const highlightedProvinces = useRef<string[]>([]);
  // 存储省份的原始颜色，用于恢复
  const provinceOriginalColors = useRef<Record<string, any>>({});

  const cityToProvinceMap: any = {
    武汉: ['河南', '湖北', '湖南', '安徽'],
    成都: ['四川', '贵州', '广西', '云南', '西藏', '重庆'],
    重庆: ['四川', '贵州', '广西', '云南', '西藏', '重庆'],
    西安: ['陕西', '甘肃', '宁夏', '青海', '新疆'],
    北京: ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江'],
    石家庄: [
      '北京',
      '天津',
      '河北',
      '山西',
      '内蒙古',
      '辽宁',
      '吉林',
      '黑龙江',
    ],
    广州: ['广东', '福建', '江西', '海南'],
    珠海: ['广东', '福建', '江西', '海南'],
    深圳: ['广东', '福建', '江西', '海南'],
    南京: ['江苏', '山东', '上海'],
    上海: ['江苏', '山东', '上海'],
    杭州: ['浙江'],
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

  // 计算省份列表的中心坐标
  const calculateCenterCoord = (provinces: string[]) => {
    if (!provinces.length) return [0, 0];

    let sumX = 0;
    let sumY = 0;
    let count = 0;

    provinces.forEach((province) => {
      const coord = provinceCenterMap[province];
      if (coord) {
        sumX += coord[0];
        sumY += coord[1];
        count++;
      }
      // 浙江大区往下偏移一点
      if (province === '浙江') {
        sumY -= 1;
      }
    });

    return count > 0 ? [sumX / count, sumY / count] : [0, 0];
  };

  // 获取大区名称
  const getRegionName = (provinces: string[]) => {
    if (!provinces.length) return '';
    return provinceToRegionMap[provinces[0]] || '';
  };

  const geoGpsMap = [120.15507, 30.274084];
  const colors = '#1D94C9';
  // 高亮颜色配置
  const highlightColor = '#40C4FF';
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
  const convertData = (data) => {
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

  // 高亮省份的方法
  const highlightProvinces = (provinces: string[]) => {
    if (!myChart.current || !provinces.length) return;

    highlightedProvinces.current = provinces;
    const option = myChart.current.getOption();
    const newGeo = JSON.parse(JSON.stringify(option.geo[0]));

    provinces.forEach((province) => {
      if (!provinceOriginalColors.current[province]) {
        provinceOriginalColors.current[province] = {
          areaColor: normalColor,
          borderColor: 'transparent',
        };
      }

      newGeo.regions = newGeo.regions || [];
      newGeo.regions.push({
        name: province,
        itemStyle: {
          areaColor: highlightColor,
          borderColor: '#007ECA',
          borderWidth: 2,
          shadowColor: 'rgba(0, 126, 202, 0.5)',
          shadowBlur: 10,
        },
      });
    });

    myChart.current.setOption({ geo: [newGeo] });
  };

  // 清除省份高亮
  const clearProvinceHighlight = () => {
    if (!myChart.current || highlightedProvinces.current.length === 0) return;

    const option = myChart.current.getOption();
    const newGeo = JSON.parse(JSON.stringify(option.geo[0]));
    newGeo.regions = [];

    myChart.current.setOption({ geo: [newGeo] });
    highlightedProvinces.current = [];
  };

  // 显示省份名称标签
  const showProvinceLabels = (provinces: string[]) => {
    if (!myChart.current || !provinces.length) return;

    const provinceLabelData = provinces.map((province) => {
      const coord = provinceCenterMap[province];
      return {
        name: province,
        value: coord,
      };
    });

    myChart.current.setOption({
      series: [
        {
          id: provinceLabelSeriesId.current,
          data: provinceLabelData,
          label: {
            normal: {
              show: true,
              formatter: (params) => params.name,
              fontSize: 16,
              color: '#005689',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: [3, 8],
              borderRadius: 2,
              fontWeight: 'bold',
            },
          },
        },
      ],
    });
  };

  // 隐藏省份名称标签
  const hideProvinceLabels = () => {
    if (!myChart.current) return;

    myChart.current.setOption({
      series: [
        {
          id: provinceLabelSeriesId.current,
          label: {
            normal: {
              show: false,
            },
          },
        },
      ],
    });
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

      const option = {
        backgroundColor: 'transparent',
        geo: {
          show: true,
          map: 'china',
          roam: false,
          zoom: 1,
          label: {
            emphasis: {
              show: true,
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
              shadowOffsetY: 5,
              shadowBlur: 5,
            },
            emphasis: {
              areaColor: highlightColor,
              borderColor: '#007ECA',
              borderWidth: 2,
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
            zlevel: 1, // 低于图标层，确保涟漪在图标下方
          },
          // 杭州的自定义图标层（新增，无涟漪效果）
          {
            type: 'scatter', // 使用普通散点图而非动态散点图
            id: hangzhouIconSeriesId.current,
            coordinateSystem: 'geo',
            data: convertData(hangzhouData), // 使用相同的杭州数据
            symbol: `image://${hangzhouIcon}`, // 自定义图标
            symbolSize: 48, // 图标大小
            symbolOffset: [0, -20], // 图标偏移调整
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
            data: [],
            symbolSize: 0,
            label: {
              normal: {
                show: false,
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
          // 省份名称标签层
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
      originalEffects.current.effectScatter = initialOption.series
        .filter((s) => s.type === 'effectScatter')
        .map((s) => ({
          id: s.id,
          showEffectOn: s.showEffectOn,
          rippleEffect: s.rippleEffect,
        }));
      originalEffects.current.linesEffectShow = true;

      // 鼠标悬停事件
      myChart.current.on('mouseover', function (params: any) {
        if (
          params.componentType === 'series' &&
          params.seriesType === 'effectScatter'
        ) {
          // 停止涟漪效果
          myChart.current.setOption({
            series: initialOption.series.map((s: any) => {
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
          });

          // 高亮相关省份并显示大区名称
          const cityName = params.name;
          const provincesToHighlight = cityToProvinceMap[cityName];
          if (provincesToHighlight) {
            highlightProvinces(provincesToHighlight);
            showProvinceLabels(provincesToHighlight);

            const centerCoord = calculateCenterCoord(provincesToHighlight);
            const regionName = getRegionName(provincesToHighlight);

            myChart.current.setOption({
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
                    },
                  },
                },
              ],
            });
          }
        }
      });

      // 鼠标离开事件
      myChart.current.on('mouseout', function (params: any) {
        if (
          params.componentType === 'series' &&
          params.seriesType === 'effectScatter'
        ) {
          // 恢复涟漪效果
          myChart.current.setOption({
            series: myChart.current.getOption().series.map((s: any) => {
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
          });

          clearProvinceHighlight();
          hideProvinceLabels();

          myChart.current.setOption({
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
          });
        }
      });
    }

    // 窗口大小调整处理
    const handleResize = () => {
      myChart.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    // 组件卸载清理
    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.current?.dispose();
      myChart.current = null;
    };
  }, []);

  return <div className="map-container" ref={chartRef} />;
};

export default ChinaMapChart;
