import caretRightOutlined from '@/assets/images/caretRightOutlined.png';
import caretUpOutlined from '@/assets/images/caretUpOutlined.png';
import arrowIcon from '@/assets/images/jiantou-right.png';
import qrcodeIcon from '@/assets/images/qrcode.svg';
import arrowRight from '@/assets/images/right-arrow-primary.png';
import Header from '@/components/Header';
import {
  getCategoryTreeList,
  getKeywords,
  getProductCategory,
  getProductFileList,
  getProductList,
} from '@/services/DownloadController';
import { getSearchList } from '@/services/HomeController';
import { downloadFile, ensureFullUrl, isImage } from '@/utils';
import {
  CaretDownOutlined,
  DownloadOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useRequest, useSearchParams } from '@umijs/max';
import { useClickAway } from 'ahooks';
import {
  Empty,
  Image,
  Input,
  Pagination,
  PaginationProps,
  Popover,
  QRCode,
} from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import './index.less';
const Download = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValParams = searchParams.get('search');
  const fileCategoryIdParams = searchParams.get('fileCategoryId');
  const idParams = searchParams.get('id');

  const [list, setList] = useState([]);
  console.log('🚀 ~ Download ~ list:', list);
  // 选择类别
  const [selectType, setSelectType] = useState({
    name: '选择类别',
    id: '',
  });

  const [showType, setShowType] = useState(false);
  //   选择产品
  const [selectProduct, setSelectProduct] = useState({
    name: '选择产品',
    id: '',
  });
  //   显示产品选项
  const [showProduct, setShowProduct] = useState(false);
  const [subKeys, setSubKeys] = useState([]);
  console.log('🚀 ~ Download ~ subKeys:', subKeys);
  const [searchVal, setSearchVal] = useState('');
  const [imgVisible, setImgVisible] = useState({
    visible: false,
    url: '',
  });
  const [currentNavKey, setCurrentNavKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const typeRef = useRef(null);
  const productRef = useRef(null);
  const isSearch = useRef(false);

  // 获取类别列表
  const { data: categoryList } = useRequest(() => {
    return getCategoryTreeList();
  });

  // 获取产品列表
  const { data: productList, run: _getProductList } = useRequest(
    getProductList,
    {
      manual: true,
    },
  );

  // 获取关键字列表
  const { data: keywordList } = useRequest(() => {
    return getKeywords();
  });

  // 获取产品文件列表
  const { data: fileList, run: _getFileList } = useRequest(
    (params) => {
      setCurrentPage(params.pageNum || 1);
      return getProductFileList(params);
    },
    {
      manual: true,
    },
  );

  // 获取产品类目列表
  const { data: productFileList, run: _getProductFileList } = useRequest(
    getProductCategory,
    {
      manual: true,
    },
  );

  // 搜索
  const { run: searchRun } = useRequest(getSearchList, {
    manual: true,
  });

  const onSearch = (val = searchVal) => {
    console.log('触发搜索');
    if (!val.trim()) return;
    isSearch.current = true;
    _getProductFileList();
    _getFileList({
      keyword: val,
      pageNum: 1,
      pageSize: 6,
    }).then((res) => {
      console.log('🚀 ~ onSearch ~ res:', res);
      setList(res);
      setCurrentNavKey({
        id: res?.rows?.[0]?.fileCategoryId,
      });
      setSelectType({
        name: '选择类别',
        id: '',
      });
      setSelectProduct({
        name: '选择产品',
        id: '',
      });
    });
  };

  useEffect(() => {
    if (fileList?.rows?.length > 0) {
      setCurrentNavKey({
        id: fileList?.rows?.[0]?.fileCategoryId,
      });
    }
    setList(fileList);
  }, [fileList]);

  useEffect(() => {
    setSelectProduct({ name: '选择产品', id: '' });
    if (selectType.id) {
      _getProductList(selectType?.id);
    }
  }, [selectType.id]);

  useEffect(() => {
    if (productFileList?.[0]) {
      setCurrentNavKey(productFileList[0]);
    }
  }, [productFileList]);
  useEffect(() => {
    if (!selectType.id) return;
    if (selectProduct.id) {
      _getProductFileList({
        id: selectProduct.id,
      });
      _getFileList({
        // fileCategoryId: currentNavKey?.id,
        productId: selectProduct.id,
        pageSize: 6,
      }).then((res) => {
        setCurrentNavKey(res.rows?.[0]?.fileCategoryId);
      });
    }

    return () => {};
  }, [selectProduct.id]);
  useEffect(() => {
    if (idParams) {
      _getProductFileList({
        id: idParams,
      });
      setSelectProduct({
        id: idParams,
        name: searchValParams,
      });
      _getFileList({
        fileCategoryId: fileCategoryIdParams,
        productId: idParams,
        pageSize: 6,
      });
    }
  }, [idParams]);
  useClickAway(() => {
    setShowType(false);
  }, typeRef);
  useClickAway(() => {
    setShowProduct(false);
  }, productRef);

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
  const RecursiveMenuItem = ({
    item,
    setSelectType,
    setShowType,
    subKeys,
    setSubKeys,
  }) => {
    const hasChildren = item.children?.length > 0;

    const onItemClick = (e) => {
      if (hasChildren) {
        e.stopPropagation();
        let newSubKeys = [...subKeys];
        if (newSubKeys.includes(item.id)) {
          newSubKeys = newSubKeys.filter((key) => key !== item.id);
        } else {
          newSubKeys.push(item.id);
        }
        setSubKeys(newSubKeys);
        return;
      }
      setSelectType(item);
      setShowType(false);
    };

    return (
      <div
        className={classNames('fl-download-bg-search-list-item', {
          'sub-show': subKeys.includes(item.id) && hasChildren,
        })}
        key={item.id}
        onClick={onItemClick}
      >
        {item.name}

        {hasChildren && (
          <>
            <span className="fl-download-bg-search-list-item-icon">
              <CaretDownOutlined />
            </span>
            <div
              className={classNames('fl-download-bg-search-list-item-sub', {
                'sub-show': subKeys.includes(item.id),
              })}
            >
              {item.children.map((sub) => (
                <RecursiveMenuItem
                  key={sub.id}
                  item={sub}
                  setSelectType={setSelectType}
                  setShowType={setShowType}
                  subKeys={subKeys}
                  setSubKeys={setSubKeys}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
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
                <div className="gradient-text">{selectType.name}</div>
                <div className="fl-download-bg-search-btn-title-icon">
                  <img
                    src={showType ? caretUpOutlined : caretRightOutlined}
                    alt=""
                  />
                </div>
              </div>
              <div className="fl-download-bg-search-list">
                {categoryList?.map((item) => {
                  return (
                    <RecursiveMenuItem
                      key={item.id}
                      item={item}
                      setSelectType={setSelectType}
                      setShowType={setShowType}
                      subKeys={subKeys}
                      setSubKeys={setSubKeys}
                    />
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
                  disabled: !selectType.id,
                },
              )}
              onClick={() => {
                if (!selectType.id) {
                  return;
                }
                setShowProduct(!showProduct);
              }}
            >
              <div className="fl-download-bg-search-btn-title">
                <div className="gradient-text">{selectProduct?.name}</div>
                <div className="fl-download-bg-search-btn-title-icon">
                  <img
                    src={showProduct ? caretUpOutlined : caretRightOutlined}
                    alt=""
                  />
                </div>
              </div>
              <div className="fl-download-bg-search-list">
                {productList?.map((item) => {
                  return (
                    <div
                      className={classNames('fl-download-bg-search-list-item', {
                        'sub-show': subKeys.includes(item.id),
                      })}
                      key={item.id}
                      onClick={(e) => {
                        setSelectProduct(item);
                        setShowProduct(false);
                        isSearch.current = false;
                      }}
                    >
                      {item.name}
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
                  value={searchVal}
                  allowClear
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
              {keywordList?.map((item) => {
                return (
                  <div
                    className="fl-download-bg-hot-search-list-item"
                    key={item.id}
                    onClick={async () => {
                      onSearch(item.title);

                      // _getFileList({
                      //   keyword: item.title,
                      //   pageSize: 6,
                      // });
                    }}
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="fl-download-content">
        <div className="fl-download-content-nav">
          {productFileList
            ?.filter((item) => {
              if (isSearch.current) {
                return (
                  list?.rows.findIndex((i) => i.fileCategoryId === item.id) !==
                  -1
                );
              }
              return item;
            })
            ?.map((item, index) => {
              return (
                <div
                  className="fl-download-content-nav-item"
                  key={item.id}
                  onClick={() => {
                    setCurrentNavKey(item);
                    if (!selectProduct.id) return;
                    _getFileList({
                      fileCategoryId: item?.id,
                      productId: selectProduct.id,
                      pageSize: 6,
                    });
                  }}
                >
                  <div
                    className={classNames(
                      'fl-download-content-nav-item-title',
                      {
                        'gradient-text': currentNavKey?.id === item.id,
                      },
                    )}
                  >
                    {item.name}
                  </div>
                  {currentNavKey?.id === item.id && (
                    <div className="fl-download-content-nav-item-arrow">
                      <img src={arrowIcon} alt="" />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <div className="fl-download-content-list">
          {!list || list?.rows?.length === 0 ? (
            <Empty className="fl-download-empty" />
          ) : (
            list?.rows
              ?.filter((item) => {
                return item.fileCategoryId === currentNavKey?.id;
              })
              ?.map((item, index) => {
                return (
                  <div className="fl-download-content-list-item" key={item.id}>
                    <div className="fl-download-content-list-item-img" />
                    <div className="fl-download-content-list-item-text">
                      <div className="fl-download-content-list-item-text-title">
                        <span>{item.name}</span>
                      </div>
                      <div className="fl-download-content-list-item-text-footer">
                        <div className="fl-download-content-list-item-text-footer-left">
                          <div>
                            发行日期：
                            {dayjs(item.createTime).format('YYYY.MM.DD')}
                          </div>
                          <div>版本号：{item.version}</div>
                          <div>资料编号：{item.id}</div>
                        </div>
                        {item.url && (
                          <div className="fl-download-content-list-item-text-footer-right">
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
                                // window.open(item.url);
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
                                <QRCode
                                  value={ensureFullUrl(item.url)}
                                  bordered={false}
                                />
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
              })
          )}
          {/* 分页 */}
          <div className="fl-download-pagination">
            <Pagination
              current={currentPage}
              hideOnSinglePage
              defaultPageSize={6}
              total={fileList?.total}
              itemRender={itemRender}
              align="center"
              onChange={(page, pageSize) => {
                setCurrentPage(page);
                let params = {
                  fileCategoryId: currentNavKey?.id,
                  pageNum: page,
                  pageSize,
                };
                if (searchVal) {
                  params.keyword = searchVal;
                }
                if (selectProduct.id) {
                  params.productId = selectProduct.id;
                }
                if (isSearch.current) {
                  delete params.fileCategoryId;
                }
                _getFileList(params);
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
    </div>
  );
};

export default Download;
