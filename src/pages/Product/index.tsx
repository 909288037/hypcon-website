import Card from '@/components/Card';
import Header from '@/components/Header';
import { useState } from 'react';
import './index.less';
const Product = () => {
  const [icons, setIcons] = useState([
    {
      url: '',
      title: '工业智能化',
    },
    {
      url: '',
      title: '无缝集成',
    },
    {
      url: '',
      title: '高效协同',
    },
    {
      url: '',
      title: '广泛适配',
    },
    {
      url: '',
      title: '稳定可靠',
    },
  ]);
  return (
    <div className="fl-product">
      <Header className="fl-product-header" theme="light" />

      <div className="fl-product-content">
        <div className="fl-product-content-left">
          <div className="fl-product-content-left-title ">
            <div className="gradient-text">工业自动化</div>
          </div>
          <div className="fl-product-content-left-desc">
            泛联工业自动化产品线为智能制造提供强大核心动力。HypStudio开放自动化平台,打破传统限制,实现系统无缝集成与高效协同。可编程控制器涵盖中大型与小型,适配复杂或紧凑工业场景,精准控制生产流程。FCS500与FCS300
            I/O系统,稳定采集与传输信号,保障设备精准联动。从平台到控制器,再到1/0系统,泛联助力工业生产智能化升级,提升效率与可靠性,驱动工业未来。
          </div>
          <div className="fl-product-content-left-list">
            {icons.map((item, index) => (
              <div className="fl-product-content-left-list-item" key={index}>
                <div className="fl-product-content-left-list-item-icon">
                  <img src={item.url} alt="" />
                </div>
                <div className="fl-product-content-left-list-item-title">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fl-product-content-right">
          <img src="" alt="" />
        </div>
      </div>
      <div className="fl-product-cards">
        <Card />
      </div>
    </div>
  );
};

export default Product;
