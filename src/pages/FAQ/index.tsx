import arrowRight from '@/assets/images/right-arrow-primary.png';
import Header from '@/components/Header';
import { getProductNoticeDetail, getQuestion } from '@/services/ServiceNetwork';
import { MinusOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Input, Pagination, PaginationProps } from 'antd';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import './index.less';
const FAQ = () => {
  const [searchVal, setSearchVal] = useState('');
  const [list, setList] = useState(['', '']);
  const [activeKey, setActiveKey] = useState([]);
  const [detailObj, setDetailObj] = useState({});
  // 获取常见问题数据
  const { data, run } = useRequest(getQuestion);
  // 获取详情数据
  const { data: detailData, run: runDetail } = useRequest(
    getProductNoticeDetail,
  );
  const listRef = useRef(null);
  // 搜索接口
  const onSearch = () => {
    console.log('触发搜索');
    run({
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
        <div className="fl-faq-content-list" ref={listRef}>
          {data?.rows?.map((item, index) => {
            const isShow = activeKey.includes(item.id);
            return (
              <div
                key={item.id}
                className={classNames('fl-faq-content-list-item', {
                  'show-content': activeKey.includes(item.id),
                })}
                onClick={async () => {
                  activeKey.includes(item.id)
                    ? setActiveKey(activeKey.filter((key) => key !== item.id))
                    : setActiveKey([...activeKey, item.id]);
                  if (!activeKey.includes(item.id)) {
                    const res = await runDetail(item.id);
                    console.log('🚀 ~ res:', res);
                    setDetailObj({
                      ...detailObj,
                      [item.id]: res.noticeContent,
                    });
                  }
                }}
              >
                <div className="fl-faq-content-list-item-title">
                  <div
                    className={classNames({
                      'gradient-text': isShow,
                    })}
                  >
                    Q：{item.noticeTitle}
                  </div>
                </div>
                <div className=" fl-faq-content-list-item-content ">
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: detailObj?.[item.id],
                    }}
                  ></div>
                </div>
                {/* 展开按钮 */}
                <div className={'fl-faq-content-list-item-btn'}>
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
          <Pagination
            total={data?.total}
            hideOnSinglePage
            itemRender={itemRender}
            align="center"
            onChange={(page) => {
              // 回到顶部
              window.scrollTo(0, 0);
              run({
                noticeTitle: searchVal,
                pageNum: page,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
