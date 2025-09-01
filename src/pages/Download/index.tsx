import caretRightOutlined from '@/assets/images/caretRightOutlined.png';
import caretUpOutlined from '@/assets/images/caretUpOutlined.png';
import Header from '@/components/Header';
import { CaretDownOutlined } from '@ant-design/icons';
import { useClickAway } from 'ahooks';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import './index.less';
const Download = () => {
  // 选择类别
  const [selectType, setSelectType] = useState('选择类别');
  const [showType, setShowType] = useState(false);
  const [subKeys, setSubKeys] = useState([]);
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
                {[
                  {
                    title: '边缘控制器',
                  },
                  {
                    title: '可编程控制系统',
                  },
                  {
                    title: '楼宇控制产品',
                  },
                  {
                    title: '传感器',
                    children: [
                      {
                        title: '室内传感器',
                      },
                      {
                        title: '外置传感器',
                      },
                      {
                        title: '风管传感器',
                      },
                      {
                        title: '水传感器',
                      },
                    ],
                  },
                  {
                    title: '软件产品',
                  },
                ].map((item) => {
                  return (
                    <div
                      className={classNames('fl-download-bg-search-list-item', {
                        'sub-show': subKeys.includes(item.title),
                      })}
                      key={item.title}
                      onClick={(e) => {
                        if (item.children) {
                          e.stopPropagation();
                          let newSubKeys = [...subKeys];
                          if (newSubKeys.includes(item.title)) {
                            newSubKeys = newSubKeys.filter(
                              (key) => key !== item.title,
                            );
                          } else {
                            newSubKeys.push(item.title);
                          }
                          setSubKeys(newSubKeys);
                          return;
                        }
                        setSelectType(item.title);
                        setShowType(false);
                      }}
                    >
                      {item.title}

                      {item.children && (
                        <>
                          <span className="fl-download-bg-search-list-item-icon">
                            <CaretDownOutlined />
                          </span>
                          <div
                            className={classNames(
                              'fl-download-bg-search-list-item-sub',
                            )}
                          >
                            {item.children.map((sub) => {
                              return (
                                <div
                                  className="fl-download-bg-search-list-item-sub-item"
                                  key={sub.title}
                                  onClick={() => {
                                    setSelectType(sub.title);
                                    setShowType(false);
                                  }}
                                >
                                  {sub.title}
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
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
