import arrowRight from '@/assets/images/right-arrow-primary.png';
import rightArrowImg from '@/assets/images/right-arrow.png';
import Header from '@/components/Header';
import {
  getBgImg,
  getImportantList,
  getNewsList,
} from '@/services/NewsController';
import { extractPlainTextFromHTML } from '@/utils';
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import { history, useRequest } from '@umijs/max';
import { Input, Pagination, PaginationProps, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import './index.less';

const { Paragraph } = Typography;

const pageSize = 8;
const News = () => {
  const { data: importantList } = useRequest(() => {
    return getImportantList();
  });
  // 获取新闻列表
  const { data: solutionList, run } = useRequest(getNewsList);

  // 获取背景图
  const { data: backgroundImg } = useRequest(() => {
    return getBgImg();
  });

  const [searchVal, setSearchVal] = useState('');

  // 生成近五年年份
  const yearList = Array.from(new Array(5), (_, index) => {
    const year = new Date().getFullYear() - index;
    return {
      value: year,
      label: year + '年',
    };
  });
  // 月份列表
  const monthList = Array.from(new Array(12), (_, index) => {
    const month = index + 1;
    return {
      value: month,
      // 小于10补0
      label: (month < 10 ? '0' + month : month) + '月',
    };
  });
  const [currentYear, seCurrentYear] = useState(yearList[0].value);
  const [currentMonth, setCurrentMonth] = useState(monthList[0].value);

  const onSearch = () => {
    console.log('触发搜索');
    run({
      queryCreateDate:
        currentYear +
        '-' +
        (currentMonth < 10 ? '0' + currentMonth : currentMonth),
      noticeTitle: searchVal,
    });
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
    <div className="fl-news">
      <Header className="fl-news-header" />
      <div className="fl-news-banner">
        <div className="fl-news-banner-title">新闻资讯</div>
        <img src={backgroundImg} alt="" />
      </div>
      <div className="fl-news-content">
        {/* 重点新闻 */}
        <div className="fl-news-content-key">
          <div className="fl-news-content-key-title">
            <div className="gradient-text">重点新闻</div>
          </div>
          <div className="fl-news-content-key-list">
            {importantList?.map((item, index) => {
              return (
                <div
                  className="fl-news-content-key-list-item"
                  key={index}
                  onClick={() => {
                    if (item.link) {
                      window.open(item.link);
                      return;
                    }
                    history.push(`/product-notice/${item.id}`);
                  }}
                >
                  <div className="fl-news-content-key-list-item-title">
                    {item.noticeTitle}
                  </div>
                  <div className="fl-news-content-key-list-item-img">
                    <img src={item.image} alt="" />
                  </div>
                  <Paragraph ellipsis={{ rows: 2 }}>
                    <div className="fl-news-content-key-list-item-text ">
                      {extractPlainTextFromHTML(item.noticeContent)}
                    </div>
                  </Paragraph>

                  <div className="fl-news-content-key-list-item-footer">
                    <div className="fl-news-content-key-list-item-footer-time">
                      {dayjs(item.createTime).format('YYYY.MM.DD')}
                    </div>
                    <div className="fl-news-content-key-list-item-footer-btn">
                      查看详情
                      <div className="fl-news-content-key-list-item-footer-arrow">
                        <img src={rightArrowImg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="solution">
            <div className="fl-news-content-key-title">
              <div className="solution-select">
                <div className="solution-select-year">
                  <Select
                    options={yearList}
                    defaultValue={yearList[0].label}
                    placeholder={yearList[0].label}
                    suffixIcon={<CaretDownOutlined />}
                    onChange={(value) => {
                      console.log('🚀 ~ value:', value);
                      seCurrentYear(value);
                      run({
                        queryCreateDate:
                          value +
                          '-' +
                          (currentMonth < 10
                            ? '0' + currentMonth
                            : currentMonth),
                        noticeTitle: searchVal,
                      });
                    }}
                  />
                </div>
                <div className="solution-select-month">
                  <Select
                    defaultValue={new Date().getMonth() + 1}
                    options={monthList}
                    placeholder={new Date().getMonth() + 1 + '月'}
                    suffixIcon={<CaretDownOutlined />}
                    onChange={(value) => {
                      console.log('🚀 ~ value:', value);
                      setCurrentMonth(value);
                      run({
                        queryCreateDate:
                          currentYear +
                          '-' +
                          (value < 10 ? '0' + value : value),
                        noticeTitle: searchVal,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="solution-search">
                {!searchVal && (
                  <div className="solution-search-placeholder">
                    <div className="gradient-text">输入关键词</div>
                  </div>
                )}
                <Input
                  className="solution-search-input"
                  variant="borderless"
                  size="large"
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                  }}
                  onPressEnter={() => {
                    onSearch();
                  }}
                ></Input>
                <div
                  className="solution-search-button"
                  onClick={() => {
                    onSearch();
                  }}
                >
                  <SearchOutlined />
                </div>
              </div>
            </div>
            <div className="solution-list">
              {solutionList?.rows?.map((item, index) => {
                return (
                  <div
                    className="solution-list-item"
                    key={index}
                    onClick={() => {
                      history.push(`/product-notice/${item.id}`);
                    }}
                  >
                    <div className="solution-list-item-img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="solution-list-item-content">
                      <div className="solution-list-item-title">
                        {item.noticeTitle}
                      </div>
                      <Paragraph ellipsis={{ rows: 2 }}>
                        <div className="solution-list-item-text">
                          {extractPlainTextFromHTML(item.noticeContent)}
                        </div>
                      </Paragraph>

                      <div className="solution-list-item-date">
                        {dayjs(item.createTime).format('YYYY.MM.DD')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="solution-pagination">
              <Pagination
                total={solutionList?.total}
                onChange={(page, pageSize) => {
                  run({
                    pageNum: page,
                    pageSize,
                    queryCreateDate:
                      currentYear +
                      '-' +
                      (currentMonth < 10 ? '0' + currentMonth : currentMonth),
                    noticeTitle: searchVal,
                  });
                }}
                hideOnSinglePage
                defaultPageSize={pageSize}
                itemRender={itemRender}
                align="center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
