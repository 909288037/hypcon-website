import { RightOutlined } from '@ant-design/icons';
import { history, useRequest } from '@umijs/max';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { getProductList } from '@/services/HomeController';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import downArrow from '../../assets/images/down-arrow.svg';
import localeIcon from '../../assets/images/locale.svg';
import logoActive from '../../assets/images/logo-active.png';
import logo from '../../assets/images/logo.png';
import searchIcon from '../../assets/images/search.svg';
import zkxxActive from '../../assets/images/zkxx-active.png';
import zkxx from '../../assets/images/zkxx.png';
import './index.less';

interface BaseProps {
  className?: string;
  theme?: 'default' | 'light';
}

const Header: FC<BaseProps> = ({ className, theme = 'default' }) => {
  const {
    data: productList,
    error,
    loading,
  } = useRequest(() => {
    return getProductList();
  });
  console.log('🚀 ~ Header ~ productList:', productList);
  const [menuArr, setMenuArr] = useState([
    {
      title: '产品中心',
      children: [
        {
          title: '楼宇自控',
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
          title: '工业自动化',
          children: [
            {
              title: '产品2-1',
            },
            {
              title: '产品2-2',
            },
          ],
        },
        {
          title: '工业互联网',
          children: [],
        },
      ],
    },
    {
      title: '解决方案',
    },
    {
      title: '服务支持',
      children: [
        {
          title: '服务保障',
          children: [
            {
              title: '服务网络',
            },
          ],
        },
        {
          title: '资料下载',
          url: '/download',
        },
      ],
    },
    {
      title: '新闻资讯',
    },
    {
      title: '关于我们',
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  console.log('🚀 ~ Header ~ currentIndex:', currentIndex, theme);
  const [cascaderData, setCascaderData] = useState([]);
  return (
    <div
      className={classNames('fl-header', className, {
        'fl-header-hover': currentIndex > -1,
        [`fl-header-${theme}`]: theme,
      })}
    >
      <div
        className="fl-header-logo"
        onClick={() => {
          history.push('/');
        }}
      >
        <img
          src={currentIndex > -1 || theme !== 'default' ? logoActive : logo}
          alt="泛联·HYPCON"
        />
      </div>
      <div
        className="fl-header-menu"
        onMouseLeave={() => {
          setCurrentIndex(-1);
          setCascaderData([]);
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
          <div className="fl-header-cascader-box">
            {menuArr[currentIndex]?.children?.length > 0 && (
              <div className={`fl-header-cascader-menus`}>
                {menuArr[currentIndex]?.children?.map((child, index) => (
                  <div
                    className={classNames('fl-header-cascader-menus-menu', {
                      active: cascaderData?.[0]?.key === index,
                    })}
                    key={index}
                    onMouseEnter={() => {
                      if (child.children) {
                        setCascaderData([
                          {
                            key: index,
                            data: child.children,
                          },
                        ]);
                      } else {
                        setCascaderData([]);
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

            {/* 2级子项 */}
            {cascaderData[0] && (
              <div className={`fl-header-cascader-menus`}>
                {cascaderData[0]?.data?.map((child, index) => (
                  <div
                    className={classNames('fl-header-cascader-menus-menu', {
                      active: cascaderData?.[1]?.key === index,
                    })}
                    key={index}
                    onMouseEnter={() => {
                      if (child.children) {
                        cascaderData[1] = { key: index, data: child.children };
                        setCascaderData([...cascaderData]);
                      } else {
                        setCascaderData(cascaderData.slice(0, 1));
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

            {/* 3级子项 */}
            {cascaderData[1] && (
              <div
                className={`fl-header-cascader-menus fl-header-cascader-menus-level-3`}
              >
                {cascaderData[1]?.data?.map((child, index) => (
                  <div
                    className={classNames('fl-header-cascader-menus-menu', {
                      active: cascaderData?.[2]?.key === index,
                    })}
                    key={index}
                    onMouseEnter={() => {
                      if (child.children) {
                        cascaderData[2] = { key: index, data: child.children };
                        setCascaderData([...cascaderData]);
                      } else {
                        setCascaderData(cascaderData.slice(0, 2));
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
          </div>
          <div className="fl-header-cascader-swiper">
            <Swiper
              className="fl-header-cascader-swiper"
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop
              pagination={{
                clickable: true,
                renderBullet: function (index, className) {
                  return `<span class=${className}></span>`;
                },
              }}
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <div className="fl-header-right">
        <div className="fl-header-right-logo">
          <img
            src={currentIndex > -1 || theme !== 'default' ? zkxxActive : zkxx}
            alt=""
          />
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
