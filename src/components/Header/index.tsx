import { RightOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import classNames from 'classnames';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import downArrow from '../../assets/images/down-arrow.svg';
import localeIcon from '../../assets/images/locale.svg';
import logo from '../../assets/images/logo.svg';
import searchIcon from '../../assets/images/search.svg';
import zkxx from '../../assets/images/zkxx.svg';
import './index.less';
const Header = () => {
  const [menuArr, setMenuArr] = useState([
    {
      title: '产品中心',
      children: [
        {
          title: '产品1',
          children: [
            {
              title: '产品1-1',
            },
            {
              title: '产品1-2',
              children: [
                {
                  title: '产品1-2-1',
                },
                {
                  title: '产品1-2-2',
                },
              ],
            },
          ],
        },
        {
          title: '产品2',
        },
      ],
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cascaderData, setCascaderData] = useState(null);
  console.log('🚀 ~ Header ~ cascaderData:', cascaderData);
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
        {/* <img src={logo} alt="泛联·HYPCON" /> */}
        <ReactSVG src={logo} />
      </div>
      <div
        className="fl-header-menu"
        onMouseLeave={() => {
          // setCurrentIndex(-1);
        }}
      >
        {menuArr.map((item, index) => {
          return (
            <div
              className={classNames('fl-header-menu-item', {
                active: currentIndex === index,
              })}
              key={item.title}
              onMouseOver={() => {
                setCurrentIndex(index);
              }}
            >
              <span className="menu-title">{item.title}</span>
              <ReactSVG className="menu-icon" src={downArrow}></ReactSVG>
            </div>
          );
        })}
        {/* 下拉菜单 */}

        <div className="fl-header-dropdown">
          {menuArr[currentIndex]?.children?.length > 0 && (
            <div className={`fl-header-cascader-menus`}>
              {menuArr[currentIndex]?.children?.map((child, index) => (
                <div
                  className={classNames('fl-header-cascader-menus-menu', {
                    active: cascaderData?.[index],
                  })}
                  key={index}
                  onMouseEnter={() => {
                    if (child.children) {
                      setCascaderData({
                        [index]: {
                          key: index,
                          data: child.children,
                        },
                      });
                    } else {
                      setCascaderData(null);
                    }
                  }}
                >
                  <div className="fl-header-cascader-menus-menu-title">
                    {child.title}
                  </div>
                  {child.children && (
                    <div>
                      <RightOutlined />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {Object.values(cascaderData || {}).map((item, i) => {
            if(!item) return null;
            return (
              <div className={`fl-header-cascader-menus`} key={i} >
                {item?.data?.map((child, index) => (
                  <div
                    className={classNames('fl-header-cascader-menus-menu', {
                    active: cascaderData?.[i + '-' + index],
                  })}
                    key={index}
                    onMouseEnter={() => {
                      if (child.children) {
                        setCascaderData({
                          ...cascaderData,
                          [i + '-' + index]: {
                            key: i + '-' + index,
                            data: child.children,
                          },
                        });
                      } else {
                       
                      }
                    }}
                  
                  >
                    <div className="fl-header-cascader-menus-menu-title">
                      {child.title}
                    </div>
                    {child.children && (
                      <div>
                        <RightOutlined />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="fl-header-right">
        <div className="fl-header-right-logo">
          <ReactSVG className="logo-icon" src={zkxx}></ReactSVG>
        </div>
        <div className="fl-header-right-search">
          <ReactSVG className="search-icon" src={searchIcon}></ReactSVG>
        </div>
        <div className="fl-header-right-locale">
          <ReactSVG className="search-icon" src={localeIcon}></ReactSVG>
        </div>
      </div>
    </div>
  );
};

export default Header;
