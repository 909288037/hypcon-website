import arrowIcon from '@/assets/images/jiantou-right.png';
import qrcodeIcon from '@/assets/images/qrcode.svg';
import arrowRight from '@/assets/images/right-arrow-primary.png';
import Card, { highlightKeywords } from '@/components/Card';
import CustomEmpty from '@/components/CustomEmpty';
import Header from '@/components/Header';
import {
  getKeywords,
  getProductCategory,
  getProductFileList,
} from '@/services/DownloadController';
import {
  getSearchListByKeyword,
  getSearchNewsList,
  getSearchProductList,
  getSearchSolutionList,
} from '@/services/HomeController';
import { downloadFile, extractPlainTextFromHTML, isImage } from '@/utils';
import {
  DownloadOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { history, useRequest } from '@umijs/max';
import {
  Image,
  Input,
  Pagination,
  PaginationProps,
  Popover,
  QRCode,
  Tabs,
  Typography,
} from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';
import './index.less';
const { Paragraph } = Typography;

const Search = () => {
  const [searchVal, setSearchVal] = useState('');
  const { data, run: searchRun } = useRequest(getSearchListByKeyword, {
    manual: true,
  });
  const [currentNavKey, setCurrentNavKey] = useState(null);
  const tabItems = useMemo(() => {
    return [
      {
        key: '1',
        label: `产品（${data?.productTotal || 0}）`,
        children: null,
      },
      {
        key: '2',
        label: `解决方案（${data?.solutionTotal || 0}）`,
        children: null,
      },
      {
        key: '3',
        label: `新闻（${data?.noticeTotal || 0}）`,
        children: null,
      },
      {
        key: '4',
        label: `资料（${data?.fileTotal || 0}）`,
        children: null,
      },
    ];
  }, [data]);
  const [currentKey, setCurrentKey] = useState(tabItems[0].key);
  const [imgVisible, setImgVisible] = useState({
    visible: false,
    url: '',
  });
  // 获取关键字列表
  const { data: keywordList } = useRequest(() => {
    return getKeywords();
  });

  //  产品分页数据
  const { data: productList, run: getProductList } = useRequest(
    getSearchProductList,
    {
      manual: true,
    },
  );

  //   解决方案数据
  const { data: solutionList, run: getSolutionList } = useRequest(
    getSearchSolutionList,
    {
      manual: true,
    },
  );

  //   新闻分页数据
  const { data: newsList, run: getNewsList } = useRequest(getSearchNewsList, {
    manual: true,
  });

  //   获取资料数据
  const { data: downloadList, run: getDownloadList } = useRequest(
    getProductFileList,
    {
      manual: true,
    },
  );

  // 获取产品类目列表
  const { data: productFileList } = useRequest(() => {
    return getProductCategory();
  });
  const getData = (val = searchVal) => {
    if (!val) return;
    if (currentKey === '1') {
      getProductList({
        keyword: val,
        pageSize: 6,
      });
    }
    if (currentKey === '2') {
      getSolutionList({
        keyword: val,
        pageSize: 6,
      });
    }

    if (currentKey === '3') {
      getNewsList({
        keyword: val,
        pageSize: 8,
      });
    }
    if (currentKey === '4') {
      getDownloadList({
        name: val,
        fileCategoryId: currentNavKey?.id,
        pageSize: 8,
      }).then((res) => {
        setCurrentNavKey({
          id: res.rows?.[0]?.fileCategoryId,
        });
      });
    }
  };

  const onSearch = (val = searchVal) => {
    console.log('触发搜索');
    searchRun({
      keyword: val,
    }).then((res) => {
      console.log('🚀 ~ onSearch ~ res:', res);
    });
    getData(val);
  };

  useEffect(() => {
    if(searchVal.trim()) {
      onSearch(searchVal);  
    }
  }, [currentKey]);
  const onTabChange = (key: string) => {
    console.log(key);
    setCurrentKey(key);
    if (key === '4') {
      setCurrentNavKey(null);
    }
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
    <div className="fl-search">
      <Header className="fl-search-header" />
      <div className="fl-search-banner">
        {/* 搜索容器 */}
        <div className="fl-search-banner-search-box">
          {/* 搜索 */}
          <div className="fl-search-banner-search">
            {/* 搜索占位文字 */}
            {!searchVal && (
              <div className="fl-search-banner-search-placeholder">
                <div className="gradient-text">输入关键词 / 产品型号</div>
              </div>
            )}
            <div className="fl-search-banner-search-input">
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
              className="fl-search-banner-search-button"
              onClick={() => {
                onSearch();
              }}
            >
              <SearchOutlined />
            </div>
          </div>
          {/* 热门搜索 */}
          <div
            className="fl-search-banner-hot-search"
            hidden={keywordList?.length === 0 || !keywordList}
          >
            <div className="fl-search-banner-hot-search-title">热门搜索</div>
            <div className="fl-search-banner-hot-search-list">
              {keywordList?.map((item) => {
                return (
                  <div
                    className="fl-search-banner-hot-search-list-item"
                    key={item.id}
                    onClick={() => {
                      setSearchVal(item.title);
                      onSearch(item.title);
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
      <div className="fl-search-content">
        <div className="fl-search-content-tabs">
          <Tabs
            tabBarExtraContent={{
              left: (
                <div className="fl-search-content-tabs-total">
                  <div className="gradient-text">
                    搜索结果：{data?.total || 0}条
                  </div>
                </div>
              ),
            }}
            defaultActiveKey="1"
            activeKey={currentKey}
            items={tabItems}
            onChange={onTabChange}
          />
        </div>

        {/* 产品 */}
        {currentKey === '1' && (
          <div className="fl-search-product">
            <div className="fl-search-product-list">
              {productList?.rows?.length > 0 ? (
                productList?.rows?.map((item) => {
                  return (
                    <Card
                      key={item.id}
                      type="view"
                      dataSource={item}
                      matchOption={{
                        keyword: searchVal,
                      }}
                    />
                  );
                })
              ) : (
                <CustomEmpty />
              )}
            </div>

            {/* 分页 */}
            <div className="fl-search-pagination">
              <Pagination
                total={data?.productTotal}
                hideOnSinglePage
                itemRender={itemRender}
                align="center"
                onChange={(page, pageSize) => {
                  // 回到顶部
                  window.scrollTo(0, 0);
                  getProductList({
                    keyword: searchVal,
                    pageNum: page,
                    pageSize,
                  });
                }}
              />
            </div>
          </div>
        )}

        {/* 解决方案 */}
        {currentKey === '2' && (
          <div className="fl-search-solution">
            <div className="fl-search-solution-list">
              {solutionList?.rows?.length > 0 ? (
                solutionList?.rows?.map((item) => {
                  return (
                    <Card
                      key={item.id}
                      type="view"
                      dataSource={item}
                      matchOption={{
                        keyword: searchVal,
                      }}
                    />
                  );
                })
              ) : (
                <CustomEmpty />
              )}
            </div>

            {/* 分页 */}
            <div className="fl-search-pagination">
              <Pagination
                total={data?.solutionTotal}
                hideOnSinglePage
                itemRender={itemRender}
                align="center"
                onChange={(page, pageSize) => {
                  // 回到顶部
                  window.scrollTo(0, 0);
                  getSolutionList({
                    keyword: searchVal,
                    pageNum: page,
                    pageSize,
                  });
                }}
              />
            </div>
          </div>
        )}

        {/* 新闻 */}
        {currentKey === '3' && (
          <div className="fl-search-news">
            {newsList?.rows?.length > 0 ? (
              <div className="fl-search-news-list">
                {newsList?.rows?.map((item, index) => {
                  return (
                    <div
                      className="fl-search-news-list-item"
                      key={index}
                      onClick={() => {
                        if (item.link) {
                          window.open(item.link);
                          return;
                        }
                        history.push(`/product-notice/${item.id}`);
                      }}
                    >
                      <div className="fl-search-news-list-item-img">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="fl-search-news-list-item-content">
                        <div className="fl-search-news-list-item-title">
                          {highlightKeywords(item.noticeTitle, searchVal)}
                        </div>
                        <Paragraph ellipsis={{ rows: 2 }}>
                          <div className="fl-search-news-list-item-text">
                            {highlightKeywords(
                              extractPlainTextFromHTML(item.noticeContent),
                              searchVal,
                            )}
                          </div>
                        </Paragraph>

                        <div className="fl-search-news-list-item-date">
                          {dayjs(item.createTime).format('YYYY.MM.DD')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <CustomEmpty />
            )}

            {/* 分页 */}
            <div className="fl-search-pagination">
              <Pagination
                total={data?.noticeTotal}
                hideOnSinglePage
                defaultPageSize={8}
                itemRender={itemRender}
                align="center"
                onChange={(page, pageSize) => {
                  // 回到顶部
                  window.scrollTo(0, 0);
                  getNewsList({
                    keyword: searchVal,
                    pageNum: page,
                    pageSize,
                  });
                }}
              />
            </div>
          </div>
        )}

        {/* 资料 */}
        {currentKey === '4' && (
          <div className="fl-search-file">
            <div className="fl-search-file-content">
              <div className="fl-search-file-content-nav">
                {productFileList?.map((item, index) => {
                  return (
                    <div
                      className="fl-search-file-content-nav-item"
                      key={item.id}
                      onClick={() => {
                        setCurrentNavKey(item);
                        if (!searchVal.trim()) return;
                        getDownloadList({
                          name: searchVal,
                          fileCategoryId: item.id,
                          pageSize: 8,
                        });
                      }}
                    >
                      <div
                        className={classNames(
                          'fl-search-file-content-nav-item-title',
                          {
                            'gradient-text': currentNavKey?.id === item.id,
                          },
                        )}
                      >
                        {item.name}
                      </div>
                      {currentNavKey?.id === item.id && (
                        <div className="fl-search-file-content-nav-item-arrow">
                          <img src={arrowIcon} alt="" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {downloadList?.rows?.length > 0 ? (
                <div className="fl-search-file-content-list">
                  {downloadList?.rows?.map((item, index) => {
                    return (
                      <div
                        className="fl-search-file-content-list-item"
                        key={item.id}
                      >
                        <div className="fl-search-file-content-list-item-img" />
                        <div className="fl-search-file-content-list-item-text">
                          <div className="fl-search-file-content-list-item-text-title">
                            <span>{highlightKeywords(item.name, searchVal)}</span>
                          </div>
                          <div className="fl-search-file-content-list-item-text-footer">
                            <div className="fl-search-file-content-list-item-text-footer-left">
                              <div>
                                发行日期：
                                {dayjs(item.createTime).format('YYYY.MM.DD')}
                              </div>
                              <div>版本号：{item.version}</div>
                              <div>资料编号：{item.id}</div>
                            </div>
                            {item.url && (
                              <div className="fl-search-file-content-list-item-text-footer-right">
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

                  {/* 分页 */}
                  <div className="fl-download-pagination">
                    <Pagination
                      hideOnSinglePage
                      defaultPageSize={8}
                      total={data?.fileTotal}
                      itemRender={itemRender}
                      align="center"
                      onChange={(page, pageSize) => {
                        getDownloadList({
                          name: searchVal,
                          pageNum: page,
                          fileCategoryId: currentNavKey?.id,
                          pageSize,
                        });
                      }}
                    />
                  </div>
                </div>
              ) : (
                <CustomEmpty />
              )}

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
        )}
      </div>
    </div>
  );
};

export default Search;
