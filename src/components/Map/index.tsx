import chinaGeoJson from '@/assets/map/geoGpsMap.json';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import './index.less';

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

const targetCities = Object.keys(geoCoordMap);
const valueData: any = {};
targetCities.forEach((city) => {
  valueData[city] = city === '杭州' ? 30000 : 10000;
});

// React 组件
const ChinaMapChart = () => {
  const chartRef = useRef(null);
  let myChart = useRef(null);

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

  // 大区映射 - 直接映射省份到大区，更直观
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

  const geoGpsMap = [120.15507, 30.274084];
  const colors = '#1D94C9';

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

  useEffect(() => {
    if (chartRef.current && !myChart.current) {
      myChart.current = echarts.init(chartRef.current);
      echarts.registerMap('china', chinaGeoJson);

      const mapData = getMapData();
      const sortedMapData = mapData
        .sort((a, b) => b.value - a.value)
        .slice(0, 20);
      const { hangzhouData, otherData } = separateHangzhouData(sortedMapData);

      // 存储原始涟漪效果配置
      let originalEffectShowConfig = {
        effectScatter: [],
        linesEffectShow: true,
      };

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
              lineHeight: 20, // 增加行高，让省份和大区名称更清晰
            },
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
                  { offset: 0, color: '#E7F5FD' },
                  { offset: 1, color: '#E0F2FE' },
                ],
                global: false,
              },
              shadowColor: '#96BBDA',
              shadowOffsetX: 0,
              shadowOffsetY: 5,
              shadowBlur: 5,
            },
            emphasis: {
              areaColor: '#ABE1FF',
            },
          },
        },
        series: [
          // 基础地图层 - 重点修改标签显示逻辑
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
                // 关键修改：直接通过省份查找对应的大区
                formatter: function (params: any) {
                  const region = provinceToRegionMap[params.name];
                  // 确保大区存在才显示，用换行分隔省份和大区
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
            coordinateSystem: 'geo',
            data: convertData(otherData),
            symbolSize: function (val: any) {
              return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: { brushType: 'stroke' },
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
          // 杭州的散点动画层
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(hangzhouData),
            symbolSize: function (val: any) {
              return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: { brushType: 'fill' },
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
            zlevel: 1,
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
        ],
      };

      myChart.current.setOption(option);

      // 保存原始效果配置
      const originalOption = myChart.current.getOption();
      originalEffectShowConfig.effectScatter = originalOption.series
        .filter((s: any) => s.type === 'effectScatter')
        .map((s: any) => s.showEffectOn);
      originalEffectShowConfig.linesEffectShow =
        originalOption.series.find((s: any) => s.type === 'lines')?.effect
          ?.show || true;

      // 鼠标悬停事件
      myChart.current.on('mouseover', function (params: any) {
        if (
          params.componentType === 'series' &&
          (params.seriesType === 'effectScatter' ||
            params.seriesType === 'scatter')
        ) {
          // 停止涟漪效果
          myChart.current.setOption({
            series: myChart.current.getOption().series.map((s: any) => {
              if (s.type === 'effectScatter') {
                return { ...s, showEffectOn: 'none' };
              }
              if (s.type === 'lines') {
                console.log('🚀 ~ ChinaMapChart ~ s:', s);
                return {
                  ...s,
                  lineStyle: { ...s.lineStyle, normal: { width: 0 } },
                  effect: { ...s.effect, show: false },
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

      // 鼠标离开事件
      myChart.current.on('mouseout', function (params: any) {
        if (
          params.componentType === 'series' &&
          (params.seriesType === 'effectScatter' ||
            params.seriesType === 'scatter')
        ) {
          // 恢复涟漪效果
          myChart.current.setOption({
            series: myChart.current
              .getOption()
              .series.map((s: any, index: number) => {
                if (s.type === 'effectScatter') {
                  return {
                    ...s,
                    showEffectOn:
                      originalEffectShowConfig.effectScatter.shift() ||
                      'render',
                  };
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
                      show: originalEffectShowConfig.linesEffectShow,
                    },
                  };
                }
                return s;
              }),
          });

          // 取消高亮
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

    // 窗口大小调整
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
