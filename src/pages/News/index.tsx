import rightArrowImg from '@/assets/images/right-arrow.png';
import Header from '@/components/Header';
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Select, Typography } from 'antd';
import { useState } from 'react';
import './index.less';
const { Paragraph } = Typography;
const News = () => {
  // 重点新闻
  const [productList, setProductList] = useState([{}, {}, {}]);

  // 新闻列表
  const [solutionList, setSolutionList] = useState([{}, {}, {}]);
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
  const onSearch = () => {
    console.log('触发搜索');
  };

  return (
    <div className="fl-news">
      <Header className="fl-news-header" />
      <div className="fl-news-banner">
        <div className="fl-news-banner-title">新闻资讯</div>
        <img src={''} alt="" />
      </div>
      <div className="fl-news-content">
        {/* 重点新闻 */}
        <div className="fl-news-content-key">
          <div className="fl-news-content-key-title">
            <div className="gradient-text">重点新闻</div>
          </div>
          <div className="fl-news-content-key-list">
            {productList.map((item, index) => {
              return (
                <div className="fl-news-content-key-list-item" key={index}>
                  <div className="fl-news-content-key-list-item-title">
                    泛联智控HypStudio开放自动化平台引领工业编程新范式
                  </div>
                  <div className="fl-news-content-key-list-item-img">
                    <img src={''} alt="" />
                  </div>
                  <Paragraph ellipsis={{ rows: 2 }}>
                    <div className="fl-news-content-key-list-item-text">
                      工业软件是智能制造的核心支撑，其自主创新是我国制造业竞争力的关键与科技自立自强的战略支点。当前，我国工业控制领域面临传统编程效率低下、专业人才短缺、多系统协同困难等问题，制约着工业控制数字化转型的纵深推进。
                    </div>
                  </Paragraph>

                  <div className="fl-news-content-key-list-item-footer">
                    <div className="fl-news-content-key-list-item-footer-time">
                      2025.07.31
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

          <div className="fl-news-content-key-title solution">
            <div className="solution-select">
              <div className="solution-select-year">
                <Select
                  options={yearList}
                  placeholder={yearList[0].label}
                  suffixIcon={<CaretDownOutlined />}
                />
              </div>
              <div className="solution-select-month">
                <Select
                  options={monthList}
                  placeholder={new Date().getMonth() + 1 + '月'}
                  suffixIcon={<CaretDownOutlined />}
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
        </div>
      </div>
    </div>
  );
};

export default News;
