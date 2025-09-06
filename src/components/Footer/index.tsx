import { aboutList, newsList, supportList } from '@/const';
import { getContact } from '@/services/AboutNetwork';
import { goPage } from '@/utils';
import { useModel, useRequest } from '@umijs/max';
import './index.less';
const Footer = () => {
  const { productList, solutionList } = useModel(
    'global',
    ({ productList, solutionList }) => ({
      productList,
      solutionList,
    }),
  );

  // 获取地址数据
  const { data } = useRequest(() => {
    return getContact();
  });
  return (
    <div className="fl-footer">
      <div className="fl-footer-content">
        <div className="fl-footer-links">
          {/* 产品中心 */}
          <ul className="fl-footer-list">
            <li className="fl-footer-list-title">产品中心</li>
            {productList?.map((item) => {
              return (
                <li
                  className="fl-footer-list-item"
                  key={item.name}
                  onClick={() => {
                    goPage(item);
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
          {/* 解决方案 */}
          <ul className="fl-footer-list">
            <li className="fl-footer-list-title">解决方案</li>
            {solutionList?.map((item) => {
              return (
                <li
                  className="fl-footer-list-item"
                  key={item.title}
                  onClick={() => {
                    goPage(item);
                  }}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
          {/* 服务支持 */}
          <ul className="fl-footer-list">
            <li className="fl-footer-list-title">服务支持</li>
            {supportList.map((item) => {
              return (
                <li
                  className="fl-footer-list-item"
                  key={item.title}
                  onClick={() => {
                    goPage(item);
                  }}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
          {/* 新闻资讯 */}
          <ul className="fl-footer-list">
            <li className="fl-footer-list-title">新闻资讯</li>
            {newsList.map((item) => {
              return (
                <li
                  className="fl-footer-list-item"
                  key={item.title}
                  onClick={() => {
                    goPage(item);
                  }}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
          {/* 关于我们 */}
          <ul className="fl-footer-list">
            <li className="fl-footer-list-title">关于我们</li>
            {aboutList.map((item) => {
              return (
                <li
                  className="fl-footer-list-item"
                  key={item.title}
                  onClick={() => {
                    goPage(item);
                  }}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="fl-footer-copyright"></div>
      </div>
      <div className="fl-footer-footer">
        <div className="fl-footer-contact-wrapper">
          {/* 联系方式 */}
          <div className="fl-footer-contact">
            <div>{data?.title}</div>
            <div>电话: {data?.res2}</div>
            <div>
              邮箱: <a href={`mailto:${data?.fourth}`}>{data?.fourth}</a>
            </div>
          </div>
          {/* 地址 */}
          <div className="fl-footer-address">地址：{data?.second}</div>
        </div>
        {/* 外链 */}
        <div className="fl-footer-exlink">
          <div className="fl-footer-friend-link">
            <a href="https://supconit.com/" target="_blank" rel="noreferrer">
              友情链接：浙江中控信息产业股份有限公司
            </a>
          </div>
          <div className="fl-footer-icp">©2025 浙ICP备05060052号-1 </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
