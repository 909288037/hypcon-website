import './index.less'
const NewsBlock = () => {
  return (
    <div className="news-block">
      <div className="news-block-head">
        <div className="news-block-title">
          <div className='news-block-title-text'>新闻资讯</div>
          <div className='news-block-title-sub-text'>了解泛联智控的最新资讯</div>
        </div>
        <div className="news-block-more">
          <div className="custom-primary-btn" onClick={() => {}}>
            <div className="custom-btn-text">了解更多</div>
            <div className="custom-btn-arrow"></div>
          </div>
        </div>
      </div>

      <div className='news-block-content'>
        {/* 封面图 */}
        <div className='news-block-cover'> 
        </div>
        <div className='news-block-list'>
            <div className='news-block-list-item'>
                <div className='news-block-list-item-left'>
                    <div className='news-title'>中控信息与拓维信息达成战略合作，联合发布在鸿边缘物联控制器EC501</div>
                    <div className='news-date'>2025.05.21</div>
                </div>
                <div className='news-block-list-item-img'>
                    {/* <img src={newsImg} alt="news" /> */}
                </div>
            </div>
             <div className='news-block-list-item'>
                <div className='news-block-list-item-left'>
                    <div className='news-title'>中控信息与拓维信息达成战略合作，联合发布在鸿边缘物联控制器EC501</div>
                    <div className='news-date'>2025.05.21</div>
                </div>
                <div className='news-block-list-item-img'>
                    {/* <img src={newsImg} alt="news" /> */}
                </div>
            </div>
             <div className='news-block-list-item'>
                <div className='news-block-list-item-left'>
                    <div className='news-title'>中控信息与拓维信息达成战略合作，联合发布在鸿边缘物联控制器EC501</div>
                    <div className='news-date'>2025.05.21</div>
                </div>
                <div className='news-block-list-item-img'>
                    {/* <img src={newsImg} alt="news" /> */}
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default NewsBlock;
