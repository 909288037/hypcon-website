import { history } from '@umijs/max';
import classNames from 'classnames';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import downArrow from '../../assets/images/down-arrow.svg';
import logo from '../../assets/images/logo.png';
import zkxx from '../../assets/images/zkxx.svg';
import './index.less';
const Header = () => {
  const [menuArr, setMenuArr] = useState([
    {
      title: '产品中心',
    },
    {
      title: '解决方案',
    },
    {
      title: '服务与支持',
    },
    {
      title: '新闻资讯',
    },
    {
      title: '关于我们',
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  return (
    <div
      className={classNames('fl-header ', {
        'fl-header-hover': currentIndex > -1,
      })}
    >
      <div
        className="fl-header-logo"
        onClick={() => {
          history.push('/');
        }}
      >
        <img src={logo} alt="泛联·HYPCON" />
      </div>
      <div className="fl-header-menu">
        {menuArr.map((item, index) => {
          return (
            <div
              className="fl-header-menu-item"
              key={item.title}
              onMouseOver={() => {
                setCurrentIndex(index);
              }}
              onMouseOut={() => {
                setCurrentIndex(-1);
              }}
            >
              <span className="menu-title">{item.title}</span>
              <ReactSVG className="menu-icon" src={downArrow}></ReactSVG>

              {/* 下拉菜单 */}

              <div className="fl-header-dropdown">123</div>
            </div>
          );
        })}
      </div>
      <div className="fl-header-right">
        <div className="fl-header-right-logo">
          <ReactSVG className="logo-icon" src={zkxx}></ReactSVG>
        </div>
      </div>
    </div>
  );
};

export default Header;
