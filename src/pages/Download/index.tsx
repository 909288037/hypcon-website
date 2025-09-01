import caretRightOutlined from '@/assets/images/caretRightOutlined.png';
import caretUpOutlined from '@/assets/images/caretUpOutlined.png';
import Header from '@/components/Header';
import { useClickAway } from 'ahooks';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import './index.less';
import { CaretDownOutlined } from '@ant-design/icons';
const Download = () => {
  // 选择类别
  const [selectType, setSelectType] = useState('选择类别');
  const [showType, setShowType] = useState(false);
  const typeRef = useRef(null);
  useClickAway(() => {
    setShowType(false);
  }, typeRef);
  return (
    <div className="fl-download">
      <Header className="fl-download-header" />
      <div className="fl-download-bg">
        <div className="fl-download-bg-title">
          <div className="gradient-text">资料下载</div>
        </div>

        {/* 搜索容器 */}
        <div className="fl-download-bg-search-box">
          <div className="fl-download-bg-search">
            {/* 选择类别 */}
            <div
             ref={typeRef}
              className={classNames(
                'fl-download-bg-search-btn fl-download-bg-search-type',
                {
                  active: showType,
                },
              )}
              onClick={() => {
                setShowType(!showType);
              }}
            >
              <div className="fl-download-bg-search-btn-title">
                <div className="gradient-text">{selectType}</div>
                <div className="fl-download-bg-search-btn-title-icon">
                  <img
                    src={showType ? caretUpOutlined : caretRightOutlined}
                    alt=""
                  />
                </div>
              </div>
              <div className="fl-download-bg-search-list">
                <div
                  className="fl-download-bg-search-list-item"
                  onClick={() => {
                    setSelectType('边缘控制器');
                    setShowType(false);
                  }}
                >
                  边缘控制器
                </div>
                <div className="fl-download-bg-search-list-item">
                  可编程控制系统
                </div>
                <div className="fl-download-bg-search-list-item">
                  楼宇控制产品
                </div>
                <div className="fl-download-bg-search-list-item" onClick={(e) => {
                    e.stopPropagation()
                }}>传感器
                    <span className='fl-download-bg-search-list-item-icon'><CaretDownOutlined /></span>
                    <div className='fl-download-bg-search-list-item-sub'>
                        {
                            ['室内传感器', '外置传感器', '风管传感器', '水传感器',].map(item => {
                                return (
                                    <div className="fl-download-bg-search-list-item-sub-item">{item}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="fl-download-bg-search-list-item">软件产品</div>
              </div>
            </div>
            {/* 选择产品 */}
            <div></div>
            {/* 搜索 */}
            <div></div>
          </div>
          {/* 热门搜索 */}
          <div className="fl-download-bg-hot-search">
            <div>热门搜索</div>
            <div className="fl-download-bg-hot-search-list">
              <div className="fl-download-bg-hot-search-item">FCS100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
