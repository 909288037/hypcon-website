import caretRightOutlined from '@/assets/images/caretRightOutlined.png';
import caretUpOutlined from '@/assets/images/caretUpOutlined.png';
import arrowIcon from '@/assets/images/jiantou-right.png';
import qrcodeIcon from '@/assets/images/qrcode.svg';
import arrowRight from '@/assets/images/right-arrow-primary.png';
import Header from '@/components/Header';
import { downloadFile } from '@/utils';
import {
  CaretDownOutlined,
  DownloadOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useClickAway } from 'ahooks';
import {
  Image,
  Input,
  Pagination,
  PaginationProps,
  Popover,
  QRCode,
} from 'antd';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import './index.less';
const Download = () => {
  // 选择类别
  const [selectType, setSelectType] = useState('选择类别');
  const [showType, setShowType] = useState(false);
  //   选择产品
  const [selectProduct, setSelectProduct] = useState('选择产品');
  //   显示产品选项
  const [showProduct, setShowProduct] = useState(false);
  const [subKeys, setSubKeys] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [imgVisible, setImgVisible] = useState({
    visible: false,
    url: '',
  });
  const [currentNavKey, setCurrentNavKey] = useState('1');
  const typeRef = useRef(null);
  const productRef = useRef(null);
  useClickAway(() => {
    setShowType(false);
  }, typeRef);
  useClickAway(() => {
    setShowProduct(false);
  }, productRef);

  const onSearch = () => {
    console.log('触发搜索');
  };
  const itemRender: PaginationProps['itemRender'] = (
    _,
    type,
    originalElement,
  ) => {
    if (type === 'prev') {
      return (
        <img src={arrowRight} alt="" style={{ transform: 'rotate(180deg)' }} />
      );
    }
    if (type === 'next') {
      return <img src={arrowRight} alt="" />;
    }
    return originalElement;
  };
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
            <div
              ref={productRef}
              className={classNames(
                'fl-download-bg-search-btn fl-download-product',
                {
                  active: showProduct,
                },
              )}
              onClick={() => {
                setShowProduct(!showProduct);
              }}
            >
              <div className="fl-download-bg-search-btn-title">
                <div className="gradient-text">{selectProduct}</div>
                <div className="fl-download-bg-search-btn-title-icon">
                  <img
                    src={showProduct ? caretUpOutlined : caretRightOutlined}
                    alt=""
                  />
                </div>
              </div>
              <div className="fl-download-bg-search-list">
                {[
                  {
                    title: 'FCS100控制系统',
                  },
                  {
                    title: 'CP系列数据采集器',
                  },
                  {
                    title: 'EMSBOX系列数据采集器',
                  },

                  {
                    title: 'LFSD照明控制系统',
                  },
                  {
                    title: 'LFSK照明控制系统',
                  },
                ].map((item) => {
                  return (
                    <div
                      className={classNames('fl-download-bg-search-list-item', {
                        'sub-show': subKeys.includes(item.title),
                      })}
                      key={item.title}
                      onClick={(e) => {
                        setSelectProduct(item.title);
                        setShowProduct(false);
                      }}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* 搜索 */}
            <div className="fl-download-search">
              {/* 搜索占位文字 */}
              {!searchVal && (
                <div className="fl-download-search-placeholder">
                  <div className="gradient-text">输入关键词 / 产品型号</div>
                </div>
              )}
              <div className="fl-download-search-input">
                <Input
                  className=""
                  variant="borderless"
                  size="large"
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                  }}
                  onPressEnter={() => {
                    onSearch();
                  }}
                ></Input>
              </div>
              <div
                className="fl-download-search-button"
                onClick={() => {
                  onSearch();
                }}
              >
                <SearchOutlined />
              </div>
            </div>
          </div>
          {/* 热门搜索 */}
          <div className="fl-download-bg-hot-search">
            <div className="fl-download-bg-hot-search-title">热门搜索</div>
            <div className="fl-download-bg-hot-search-list">
              <div className="fl-download-bg-hot-search-list-item">FCS100</div>
            </div>
          </div>
        </div>
      </div>
      <div className="fl-download-content">
        <div className="fl-download-content-nav">
          <div className="fl-download-content-nav-item" onClick={() => {}}>
            <div
              className={classNames('fl-download-content-nav-item-title', {
                'gradient-text': currentNavKey === '1',
              })}
            >
              产品手册
            </div>
            <div className="fl-download-content-nav-item-arrow">
              <img src={arrowIcon} alt="" />
            </div>
          </div>
          <div className="fl-download-content-nav-item">
            <div className={classNames('fl-download-content-nav-item-title')}>
              产品彩页
            </div>
          </div>
        </div>
        <div className="fl-download-content-list">
          <div className="fl-download-content-list-item">
            <div className="fl-download-content-list-item-img" />
            <div className="fl-download-content-list-item-text">
              <div className="fl-download-content-list-item-text-title">
                <span>FCS101 一体化控制器模块</span>
              </div>
              <div className="fl-download-content-list-item-text-footer">
                <div className="fl-download-content-list-item-text-footer-left">
                  <div>发现日期：</div>
                  <div>版本号：</div>
                  <div>资料编号：</div>
                </div>
                <div className="fl-download-content-list-item-text-footer-right">
                  <div
                    onClick={() => {
                      // 如果是pdf直接打开
                      // if (item.fileName.endsWith('.pdf')) {
                      //   // window.open(item.fileUrl)
                      // } else {
                      setImgVisible({
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200',
                        visible: true,
                      });
                      // }
                    }}
                  >
                    预览
                    <EyeOutlined />
                  </div>
                  <div
                    onClick={() => {
                      downloadFile(
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200',
                        '下载.png',
                      );
                    }}
                  >
                    下载
                    <DownloadOutlined />
                  </div>
                  <Popover
                    content={
                      <QRCode value="https://ant.design" bordered={false} />
                    }
                  >
                    <div>
                      二维码
                      <span>
                        <ReactSVG src={qrcodeIcon} />
                      </span>
                    </div>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          {/* 分页 */}
          <div className="fl-download-pagination">
            <Pagination total={50} itemRender={itemRender} align='center'/>
          </div>
        </div>

        <Image
          style={{ display: 'none' }}
          src={imgVisible?.url}
          preview={{
            visible: imgVisible.visible,
            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            onVisibleChange: (value) => {
              setImgVisible({
                ...imgVisible,
                visible: value,
              });
            },
          }}
        />
      </div>
    </div>
  );
};

export default Download;
