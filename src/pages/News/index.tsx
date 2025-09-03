import rightArrowImg from '@/assets/images/right-arrow.png';
import Header from '@/components/Header';
import './index.less';
const News = () => {
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
            <div className="fl-news-content-key-item">
              <div className="fl-news-content-key-item-title">
                <div className="gradient-text">
                  泛联智控HypStudio开放自动化平台引领工业编程新范式
                </div>
              </div>
              <div className="fl-news-content-key-item-img">
                <img src={''} alt="" />
              </div>
              <div className="fl-news-content-key-item-text">
                工业软件是智能制造的核心支撑，其自主创新是我国制造业竞争力的关键与科技自立自强的战略支点。当前，我国工业控制领域面临传统编程效率低下、专业人才短缺、多系统协同困难等问题，制约着工业控制数字化转型的纵深推进。
              </div>
              <div className="fl-news-content-key-item-footer">
                <div className='fl-news-content-key-item-footer-time'>2025.07.31</div>
                <div>
                  查看详情
                  <div className='fl-news-content-key-item-footer-arrow'>
                    <img src={rightArrowImg} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
