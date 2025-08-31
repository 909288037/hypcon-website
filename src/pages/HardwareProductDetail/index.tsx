import arrowIcon from '@/assets/images/jiantou-right.png';
import Header from '@/components/Header';
import { Tabs } from 'antd';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import './index.less';

const HardwareProductDetail = () => {
  const tabItems = useMemo(() => {
    return [
      {
        key: '1',
        label: '产品概述',
        children: null,
      },
      {
        key: '2',
        label: '规格参数',
        children: null,
      },
      {
        key: '3',
        label: '资料下载',
        children: null,
      },
    ];
  }, []);
  const [currentKey, setCurrentKey] = useState(tabItems[0].key);
  //   相关产品列表
  const [relatedList, setRelatedList] = useState([{}, {}, {}, {}, {}]);
  const [currentNavKey, setCurrentNavKey] = useState('1');
  const onTabChange = (key: string) => {
    console.log(key);
    setCurrentKey(key);
  };
  return (
    <div className="hardware-product">
      <Header className="hardware-product-header" theme="light" />
      <div className="hardware-product-detail">
        <div className="hardware-product-detail-title">
          <div className="gradient-text">FCS100控制系统</div>
        </div>
        <div className="hardware-product-detail-img">
          <img src={''} alt="" />
        </div>
        <div className="hardware-product-detail-text">
          FCS100楼宇控制系统是一款面向工业自动化及智能建筑领域开发的模块化DDC控制系统。
          本产品遵循"场景驱动设计、功能精准配置"开发逻辑，采用模块化架构设计，支持功能模块化组件自由配置，可实现行业定制化控制解决方案。
          在楼宇自控领域成熟应用多年，具备较高的市场美誉度与客户认可度。
          系统集成多模态I/O信号接口，兼容主流传感器及执行器设备，满足IEC
          61131工业控制标准。
        </div>
        <div className="hardware-product-detail-tags">
          <div className="hardware-product-detail-tag">
            <div className="hardware-product-detail-tag-icon">
              <img src="" alt="" />
            </div>
            <div className="hardware-product-detail-tag-title">模块化设计</div>
            <div className="hardware-product-detail-tag-text">
              整合统一 提升效率
            </div>
          </div>
          <div className="hardware-product-detail-tag">
            <div className="hardware-product-detail-tag-icon">
              <img src="" alt="" />
            </div>
            <div className="hardware-product-detail-tag-title">模块化设计</div>
            <div className="hardware-product-detail-tag-text">
              整合统一 提升效率
            </div>
          </div>
          <div className="hardware-product-detail-tag">
            <div className="hardware-product-detail-tag-icon">
              <img src="" alt="" />
            </div>
            <div className="hardware-product-detail-tag-title">模块化设计</div>
            <div className="hardware-product-detail-tag-text">
              整合统一 提升效率
            </div>
          </div>
          <div className="hardware-product-detail-tag">
            <div className="hardware-product-detail-tag-icon">
              <img src="" alt="" />
            </div>
            <div className="hardware-product-detail-tag-title">模块化设计</div>
            <div className="hardware-product-detail-tag-text">
              整合统一 提升效率
            </div>
          </div>
        </div>
        <div className="hardware-product-detail-tabs">
          <Tabs defaultActiveKey="1" items={tabItems} onChange={onTabChange} />
        </div>
      </div>
      {/* 产品概述 */}
      {currentKey === '1' && (
        <div className="hardware-product-overview">
          <div className="hardware-product-item">
            <div className="hardware-product-item-title">
              <div className="gradient-text">七大核心优势</div>
            </div>
            {/* 图片 */}
            <div className="hardware-product-detail-img">
              <img src={''} alt="" />
            </div>
          </div>
          <div className="hardware-product-item hardware-product-service">
            <div className="hardware-product-item-title">
              <div className="gradient-text">系统架构</div>
            </div>
            {/* 图片 */}
            <div className="hardware-product-detail-img">
              <img src={''} alt="" />
            </div>
          </div>
          {/* 相关推荐 */}
          <div className="hardware-product-item hardware-product-recommend">
            <div className="hardware-product-item-title">
              <div className="gradient-text">相关产品</div>
            </div>
            <div className="hardware-product-recommend-list">
              {relatedList.map((item, index) => {
                return (
                  <div className="hardware-product-recommend-item" key={index}>
                    <div className="hardware-product-recommend-item-img">
                      <img src="" alt="" />
                    </div>
                    <div className="hardware-product-recommend-item-title">
                      <div className="gradient-text">
                        FCS101一体化控制器模块
                      </div>
                    </div>
                    {/* 参数 */}
                    <div className="hardware-product-recommend-item-params">
                      <div>4G全网通</div>
                      <div>8*UI</div>
                    </div>
                    <div className="hardware-product-recommend-item-text">
                      支持通过CANopen总线协议拓展IO模块。
                      支持灵活配置温度、压力等模拟量采集及控制。
                      适合混合信号控制场景（如恒压供水、环境监测）。
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 规格参数 */}
      {currentKey === '2' && (
        <div className="hardware-product-specs">
          <div className="hardware-product-specs-item">
            <div className="hardware-product-specs-item-title">
              <div className="gradient-text">FCS100控制系统CPU模块</div>
            </div>
            <div className="hardware-product-specs-item-content">
              <img src="" alt="" />
            </div>
          </div>
        </div>
      )}

      {/* 资料下载 */}
      {currentKey === '3' && (
        <div className="hardware-product-download">
          <div className="hardware-product-download-nav">
            <div
              className="hardware-product-download-nav-item"
              onClick={() => {}}
            >
              <div
                className={classNames(
                  'hardware-product-download-nav-item-title',
                  {
                    'gradient-text': currentNavKey === '1',
                  },
                )}
              >
                产品手册
              </div>
              <div className="hardware-product-download-nav-item-arrow">
                <img src={arrowIcon} alt="" />
              </div>
            </div>
            <div className="hardware-product-download-nav-item">
              <div
                className={classNames(
                  'hardware-product-download-nav-item-title',
                )}
              >
                产品彩页
              </div>
            </div>
          </div>
          <div className="hardware-product-download-list">
            <div className="hardware-product-download-list-item">
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <div>FCS101 一体化控制器模块</div>
                <div>
                  <div>
                    <div>发现日期：</div>
                    <div>版本号：</div>
                    <div>资料编号：</div>
                  </div>
                  <div>
                    <div>预览</div>
                    <div>下载</div>
                    <div>二维码</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HardwareProductDetail;
