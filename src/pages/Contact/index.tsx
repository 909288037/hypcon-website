import Header from '@/components/Header';
import addressImg from './images/address-img.png';
import address from './images/address.png';
import bannerImg from './images/banner.png';

import { QrcodeOutlined } from '@ant-design/icons';
import './index.less';
const Contact = () => {
  return (
    <div className="fl-contact">
      <Header className="fl-contact-header" />
      <div className="fl-contact-banner">
        <img src={bannerImg} alt="" />
        <div className="fl-contact-banner-title">联系我们</div>
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
                杭州市滨江区长河街道滨康路352号 中控信息大厦A幢(310052)
              </div>
            </div>
          </div>
          <div className="fl-contact-content-left-item">
            <div className="fl-contact-content-left-item-icon">
              <img src={address} alt="" />
            </div>
            <div className="fl-contact-content-left-item-text">
              <div className="fl-contact-content-left-item-text-title">
                联系电话
              </div>
              <div className="fl-contact-content-left-item-text-content">
                0571-86667828
              </div>
            </div>
          </div>
          <div className="fl-contact-content-left-item">
            <div className="fl-contact-content-left-item-icon">
              <img src={address} alt="" />
            </div>
            <div className="fl-contact-content-left-item-text">
              <div className="fl-contact-content-left-item-text-title">
                电子邮箱
              </div>
              <div className="fl-contact-content-left-item-text-content">
                hypcon@supconit.com
              </div>
            </div>
          </div>
          {/* 联系方式 */}
          <div className="fl-contact-content-left-contact">
            <div className="fl-contact-content-left-contact-item">
              <div className="fl-contact-content-left-contact-item-title">
                <span className="title">华动区域</span>{' '}
                <span className="subTitle">销售二维码</span>
              </div>
              <div className="fl-contact-content-left-contact-item-icon">
                <div className="qrcode-icon">
                  <QrcodeOutlined />
                </div>
                <div className="qrcode-img">
                  <img src={''} />
                </div>
              </div>
            </div>
            <div className="fl-contact-content-left-contact-item">
              <div className="fl-contact-content-left-contact-item-title">
                <span className="title">华动区域</span>{' '}
                <span className="subTitle">销售二维码</span>
              </div>
              <div className="fl-contact-content-left-contact-item-icon">
                <div className="qrcode-icon">
                  <QrcodeOutlined />
                </div>
                <div className="qrcode-img">
                  <img src={''} />
                </div>
              </div>
            </div>
            <div className="fl-contact-content-left-contact-item">
              <div className="fl-contact-content-left-contact-item-title">
                <span className="title">华动区域</span>{' '}
                <span className="subTitle">销售二维码</span>
              </div>
              <div className="fl-contact-content-left-contact-item-icon">
                <div className="qrcode-img">
                  <img src={''} />
                </div>
                <div className="qrcode-icon">
                  <QrcodeOutlined />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fl-contact-content-right">
          <img src={addressImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
