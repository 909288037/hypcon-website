import arrowIcon from '@/assets/images/jiantou-right.png';
import qrcodeIcon from '@/assets/images/qrcode.svg';
import arrowRight from '@/assets/images/right-arrow-primary.png';
import Header from '@/components/Header';
import {
  getProductCategory,
  getProductFileList,
} from '@/services/DownloadController';
import {
  getProductDetail,
  getProductSpecification,
} from '@/services/ProductController';
import { downloadFile, isImage } from '@/utils';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { useParams, useRequest, useSearchParams } from '@umijs/max';
import {
  Image,
  Pagination,
  PaginationProps,
  Popover,
  QRCode,
  Tabs,
} from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';
import './index.less';

const pageSize = 6;
const HardwareProductDetail = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const index = searchParams.get('index');
  console.log('🚀 ~ ProductDetail ~ params:', params);
  // 获取产品详情
  const { data } = useRequest(() => {
    return getProductDetail(params.type, params.id);
  });
  // 获取规格参数数据
  const { data: specData } = useRequest(() => {
    return getProductSpecification(params.id);
  });

  // 获取产品类目列表
  const { data: productFileList } = useRequest(() => {
    return getProductCategory();
  });

  const { data: fileList, run: _getFileList } = useRequest(getProductFileList, {
    manual: true,
  });
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
  const [currentNavKey, setCurrentNavKey] = useState('1');
  const [imgVisible, setImgVisible] = useState({
    visible: false,
    url: '',
  });

  useEffect(() => {
    if (productFileList?.[0]) {
      _getFileList({
        fileCategoryId: productFileList[0].id,
        id: params.id,
        pageSize,
      });
      setCurrentNavKey(productFileList[0]);
    }
  }, [productFileList]);

  useEffect(() => {
    if (index) {
      setCurrentKey(index);
    }
  }, [index]);

  const onTabChange = (key: string) => {
    console.log(key);
    setCurrentKey(key);
  };
  return (
    <div className="hardware-product">
      <Header className="hardware-product-header" theme="light" />
      <div className="hardware-product-detail">
        <div className="hardware-product-detail-title">
          <div className="gradient-text">{data?.name}</div>
        </div>
        {data?.image && (
          <div className="hardware-product-detail-img">
            <img src={data?.image} alt="" />
          </div>
        )}
        <div
          className="hardware-product-detail-text ql-editor"
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        ></div>
        <div className="hardware-product-detail-tags">
          {data?.traitList?.map((item: any, index: number) => (
            <div className="hardware-product-detail-tag" key={index}>
              <div className="hardware-product-detail-tag-icon">
                <img src={item.image} alt="" />
              </div>
              <div className="hardware-product-detail-tag-title">
                {item.title}
              </div>
              <div className="hardware-product-detail-tag-text">
                {item.second}
              </div>
            </div>
          ))}
        </div>
        <div className="hardware-product-detail-tabs">
          <Tabs
            defaultActiveKey="1"
            activeKey={currentKey}
            items={tabItems}
            onChange={onTabChange}
          />
        </div>
      </div>
      {/* 产品概述 */}
      {currentKey === '1' && (
        <div className="hardware-product-overview">
          {data?.overview?.map((item) => {
            return (
              <div className="hardware-product-item" key={item.title}>
                <div className="hardware-product-item-title">
                  <div className="gradient-text">{item.title}</div>
                </div>
                <div className="hardware-product-detail-img">
                  <img src={item.image} alt="" />
                </div>
              </div>
            );
          })}

          {/* <div className="hardware-product-item hardware-product-service">
            <div className="hardware-product-item-title">
              <div className="gradient-text">系统架构</div>
            </div>
            <div className="hardware-product-detail-img">
              <img src={''} alt="" />
            </div>
          </div> */}
          {/* 相关推荐 */}
          <div className="hardware-product-item hardware-product-recommend">
            <div className="hardware-product-item-title">
              <div className="gradient-text">相关产品</div>
            </div>
            <div className="hardware-product-recommend-list">
              {data?.relation?.map((item, index) => {
                return (
                  <div className="hardware-product-recommend-item" key={index}>
                    <div className="hardware-product-recommend-item-img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="hardware-product-recommend-item-title">
                      <div className="gradient-text">{item.title}</div>
                    </div>
                    {/* 参数 */}
                    {/* <div className="hardware-product-recommend-item-params">
                      <div>4G全网通</div>
                      <div>8*UI</div>
                    </div> */}
                    <div
                      className="hardware-product-recommend-item-text ql-editor"
                      dangerouslySetInnerHTML={{
                        __html: item.detail,
                      }}
                    ></div>
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
          {specData?.map((item, index) => (
            <div className="hardware-product-specs-item" key={index}>
              <div className="hardware-product-specs-item-title">
                <div className="gradient-text">{item?.title}</div>
              </div>
              <div className="hardware-product-specs-item-content">
                <img src={item?.image} alt="" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 资料下载 */}
      {currentKey === '3' && (
        <div className="hardware-product-download">
          <div className="hardware-product-download-nav">
            {productFileList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="hardware-product-download-nav-item"
                  onClick={() => {
                    setCurrentNavKey(item);
                    _getFileList({
                      fileCategoryId: item.id,
                      id: params.id,
                      pageNum: 1,
                      pageSize,
                    });
                  }}
                >
                  <div
                    className={classNames(
                      'hardware-product-download-nav-item-title',
                      {
                        'gradient-text': currentNavKey?.id === item.id,
                      },
                    )}
                  >
                    {item.name}
                  </div>
                  {currentNavKey?.id === item.id && (
                    <div className="hardware-product-download-nav-item-arrow">
                      <img src={arrowIcon} alt="" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="hardware-product-download-list">
            {fileList?.rows?.map((item) => {
              return (
                <div
                  className="hardware-product-download-list-item"
                  key={item.id}
                >
                  <div className="hardware-product-download-list-item-img" />
                  <div className="hardware-product-download-list-item-text">
                    <div className="hardware-product-download-list-item-text-title">
                      <span>{item.name}</span>
                    </div>
                    <div className="hardware-product-download-list-item-text-footer">
                      <div className="hardware-product-download-list-item-text-footer-left">
                        <div>
                          发行日期：
                          {dayjs(item.createTime).format('YYYY.MM.DD')}
                        </div>
                        <div>版本号：{item.version}</div>
                        <div>资料编号：{item.id}</div>
                      </div>
                      {item.url && (
                        <div className="hardware-product-download-list-item-text-footer-right">
                          {(isImage(item.url) ||
                            item.url?.endsWith?.('.pdf')) && (
                            <div
                              onClick={() => {
                                // 如果是pdf直接打开
                                if (item.url.endsWith('.pdf')) {
                                  window.open(item.url);
                                } else {
                                  setImgVisible({
                                    url: item.url,
                                    visible: true,
                                  });
                                }
                              }}
                            >
                              预览
                              <EyeOutlined />
                            </div>
                          )}
                          <div
                            onClick={() => {
                              downloadFile(
                                item.url,
                                `${item.name}.${item.url.split('.').pop()}`,
                              );
                            }}
                          >
                            下载
                            <DownloadOutlined />
                          </div>
                          <Popover
                            content={
                              <QRCode value={item.url} bordered={false} />
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
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="hardware-product-download-pagination">
              <Pagination
                hideOnSinglePage
                defaultPageSize={6}
                total={fileList?.total}
                itemRender={itemRender}
                align="center"
                onChange={(page, pageSize) => {
                  _getFileList({
                    fileCategoryId: currentNavKey?.id,
                    id: params.id,
                    pageNum: page,
                    pageSize,
                  });
                }}
              />
            </div>
          </div>

          <Image
            style={{ display: 'none' }}
            src={imgVisible?.url}
            preview={{
              visible: imgVisible.visible,
              src: imgVisible.url,
              onVisibleChange: (value) => {
                setImgVisible({
                  ...imgVisible,
                  visible: value,
                });
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HardwareProductDetail;
