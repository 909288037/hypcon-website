import Header from '@/components/Header';
import { MinusOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Pagination, PaginationProps } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import './index.less';
import arrowRight from '@/assets/images/right-arrow-primary.png';
const FAQ = () => {
  const [searchVal, setSearchVal] = useState('');
  const [list, setList] = useState(['', '']);
  const [activeKey, setActiveKey] = useState([]);
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
    <div className="fl-faq">
      <Header className="fl-faq-header" theme="light" />
      <div className="fl-faq-content">
        <div className="fl-faq-content-title">
          <div className="gradient-text">常见问题</div>
        </div>
        <div className="fl-faq-search">
          {/* 搜索占位文字 */}
          {!searchVal && (
            <div className="fl-faq-search-placeholder">
              <div className="gradient-text">输入关键词 / 问题</div>
            </div>
          )}
          <div className="fl-faq-search-input">
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
            className="fl-faq-search-button"
            onClick={() => {
              onSearch();
            }}
          >
            <SearchOutlined />
          </div>
        </div>
        {/* 问题列表 */}
        <div className="fl-faq-content-list">
          {list.map((item, index) => {
            const isShow = activeKey.includes(index);
            return (
              <div
                key={index}
                className={classNames('fl-faq-content-list-item', {
                  'show-content': activeKey.includes(index),
                })}
              >
                <div className="fl-faq-content-list-item-title">
                  <div className={
                    classNames({
                        "gradient-text": isShow
                    })
                  }>Q：FCS100系列楼宇控制系统的核心优势是？</div>
                </div>
                <div className=" fl-faq-content-list-item-content">
                  A：FCS100系列楼宇控制系统是一款面向工业自动化及智能建筑领域开发的模块化DDC控制系统。本产品遵循"场景驱动设计、功能精准配置"开发逻辑，采用模块化架构设计，支持功能模块化组件自由配置，可实现行业定制化控制解决方案。在楼宇自控领域成熟应用多年，具备较高的市场美誉度与客户认可度。系统集成多模态I/O信号接口，兼容主流传感器及执行器设备，满足IEC
                  61131工业控制标准。
                </div>
                {/* 展开按钮 */}
                <div
                  className={'fl-faq-content-list-item-btn'}
                  onClick={() => {
                    activeKey.includes(index)
                      ? setActiveKey(activeKey.filter((key) => key !== index))
                      : setActiveKey([...activeKey, index]);
                  }}
                >
                  {isShow ? '收起查看' : '展开查看'}
                  <div className={'fl-faq-btn-icon'}>
                    {isShow ? <MinusOutlined /> : <PlusOutlined />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
          {/* 分页 */}
          <div className="fl-faq-pagination">
            <Pagination total={50} itemRender={itemRender} align='center'/>
          </div>
      </div>
    </div>
  );
};

export default FAQ;
