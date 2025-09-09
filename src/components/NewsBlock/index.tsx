import { history } from '@umijs/max';
import dayjs from 'dayjs';
import './index.less';
const NewsBlock = ({ dataSource }) => {
  console.log('🚀 ~ NewsBlock ~ dataSource:', dataSource, dataSource?.image);
  return (
    <div className="news-block">
      <div className="news-block-head">
        <div className="news-block-title">
          <div className="news-block-title-text">新闻资讯</div>
          <div className="news-block-title-sub-text">
            了解泛联智控的最新资讯
          </div>
        </div>
        <div className="news-block-more">
          <div
            className="custom-primary-btn"
            onClick={() => {
              history.push('/news');
            }}
          >
            <div className="custom-btn-text">了解更多</div>
            <div className="custom-btn-arrow"></div>
          </div>
        </div>
      </div>

      <div className="news-block-content">
        {/* 封面图 */}
        <div className="news-block-cover" onClick={() => {
                const item = dataSource?.[0];
                if (item.link) {
                  window.open(item.link);
                  return;
                }
                history.push(`/product-notice/${item?.id}`);
              }}>
          <img src={dataSource?.[0]?.image} alt="" />
          <div className="news-block-cover-title">
            {dataSource?.[0]?.noticeTitle}
            <div className="news-block-cover-date">
              {dayjs(dataSource?.[0]?.createTime).format('YYYY.MM.DD')}
            </div>
          </div>
        </div>
        <div className="news-block-list">
          {dataSource?.slice(1, 5)?.map((item, index) => (
            <div
              className="news-block-list-item"
              key={index}
              onClick={() => {
                if (item.link) {
                  window.open(item.link);
                  return;
                }
                history.push(`/product-notice/${item?.id}`);
              }}
            >
              <div className="news-block-list-item-left">
                <div className="news-title">{item?.noticeTitle}</div>
                <div className="news-date">
                  {dayjs(item?.createTime).format('YYYY.MM.DD')}
                </div>
              </div>
              <div className="news-block-list-item-img">
                <img src={item?.image} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsBlock;
