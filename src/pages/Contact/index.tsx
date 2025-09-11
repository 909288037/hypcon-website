import Header from '@/components/Header';
import address from './images/address.png';
import email from './images/email.png';
import phone from './images/phone.png';

import { getContact } from '@/services/AboutNetwork';
import { QrcodeOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Popover } from 'antd';
import './index.less';
import { useState } from 'react';
const Contact = () => {
  const [showIndex, setShowIndex] = useState(-1)
  // 获取联系我们接口
  const { data, error, loading } = useRequest(() => {
    return getContact();
  });
  return (
    <div className="fl-contact">
      <Header className="fl-contact-header" />
      <div className="fl-contact-banner">
        <img src={data?.image} alt="" />
        <div className="fl-contact-banner-title">{data?.title}</div>
      </div>
      <div className="fl-contact-content">
        <div className="fl-contact-content-left">
          <div className="fl-contact-content-left-title">
            对我们的产品、合作等有任何问题，请通过这些渠道与我们联系
          </div>
          <div className="fl-contact-content-left-item">
            <div className="fl-contact-content-left-item-icon">
              <img src={address} alt="" />
            </div>
            <div className="fl-contact-content-left-item-text">
              <div className="fl-contact-content-left-item-text-title">
                公司地址
              </div>
              <div className="fl-contact-content-left-item-text-content">
                {data?.second}
              </div>
            </div>
          </div>
          <div className="fl-contact-content-left-item">
            <div className="fl-contact-content-left-item-icon">
              <img src={phone} alt="" />
            </div>
            <div className="fl-contact-content-left-item-text">
              <div className="fl-contact-content-left-item-text-title">
                联系电话
              </div>
              <div className="fl-contact-content-left-item-text-content">
                {data?.third}
              </div>
            </div>
          </div>
          <div className="fl-contact-content-left-item">
            <div className="fl-contact-content-left-item-icon">
              <img src={email} alt="" />
            </div>
            <div className="fl-contact-content-left-item-text">
              <div className="fl-contact-content-left-item-text-title">
                电子邮箱
              </div>
              <div className="fl-contact-content-left-item-text-content">
                {data?.fourth}
              </div>
            </div>
          </div>
          {/* 联系方式 */}
          <div className="fl-contact-content-left-contact">
            {data?.detail?.map((item, index) => {
              return (
                <div
                  className="fl-contact-content-left-contact-item"
                  key={index}
                  onMouseEnter={() => setShowIndex(index)}
                  onMouseLeave={() => setShowIndex(-1)}
                >
                  <div className="fl-contact-content-left-contact-item-title">
                    <span className="title">{item.title}</span>{' '}
                    <span className="subTitle">销售二维码</span>
                  </div>
                  <div className="fl-contact-content-left-contact-item-icon">
                    <Popover
                      open={showIndex === index}
                      content={
                        <div className="qrcode-img">
                          <img src={item.image} />
                        </div>
                      }
                    >
                      <div className="qrcode-icon">
                        <QrcodeOutlined />
                      </div>
                    </Popover>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="fl-contact-content-right">
          <img src={data?.fifth} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
