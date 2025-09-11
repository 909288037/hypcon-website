import { RightOutlined } from '@ant-design/icons';
import { history, useModel, useRequest } from '@umijs/max';
import classNames from 'classnames';
import { FC, useEffect, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { getProductList, getSolutionList } from '@/services/HomeController';
import { goPage } from '@/utils';
import { useScroll } from 'ahooks';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import localeIcon from '../../assets/images/locale.svg';
import searchIcon from '../../assets/images/search.svg';
import zkxxActive from '../../assets/images/zkxx-active.png';
import zkxx from '../../assets/images/zkxx.png';
import './index.less';

interface BaseProps {
  className?: string;
  theme?: 'default' | 'light';
  isFixed?: boolean;
}

const Header: FC<BaseProps> = ({
  className,
  theme = 'default',
  isFixed = false,
}) => {
  const scroll = useScroll(document);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (isFixed) {
      if (scroll?.top >= 10) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    }
  }, [scroll]);

  const { setProductList, setSolutionList } = useModel(
    'global',
    ({ setProductList, setSolutionList }) => ({
      setProductList,
      setSolutionList,
    }),
  );
  const {
    data: productList,
    error: productListError,
    loading: productListLoading,
  } = useRequest(() => {
    return getProductList();
  });

  // 解决方案
  const {
    data: solutionList,
    error: solutionListError,
    loading: solutionListLoading,
  } = useRequest(() => {
    return getSolutionList();
  });

  const menuArr = useMemo(() => {
    const _solutionList = solutionList?.map((item) => {
      return {
        ...item,
        isSolution: true,
        name: item.title,
      };
    });
    setProductList(productList);
    setSolutionList(_solutionList);
    const menu = [
      {
        title: '产品中心',
        children: productList,
      },
      {
        title: '解决方案',
        children: _solutionList,
      },
      {
        title: '服务支持',
        children: [
          {
            title: '服务保障',
            children: [
              {
                title: '服务网络',
                url: '/service-network',
              },
              {
                title: '产品咨询',
                url: '/product-consult',
              },
              {
                title: '培训服务',
                url: '/training-service',
              },

              {
                title: '常见问题',
                url: '/faq',
              },
              {
                title: '意见反馈',
                url: '/feedback',
              },
              {
                title: '产品公告',
                url: '/product-notice',
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
        children: [
          {
            title: '新闻动态',
            url: '/news',
          },
        ],
      },
      {
        title: '关于我们',
        children: [
          {
            title: '企业简介',
            url: '/introduction',
          },
          {
            title: '联系我们',
            url: '/contact',
          },
          {
            title: '加入我们',
            url: '/join',
          },
        ],
      },
    ];
    return menu;
  }, [productList, solutionList]);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [cascaderData, setCascaderData] = useState([]);
  const [imagesSwiperArr, setImagesSwiperArr] = useState([]);
  console.log('🚀 ~ Header ~ imagesSwiperArr:', imagesSwiperArr);

  return (
    <div
      className={classNames('fl-header', className, {
        'fl-header-hover': currentIndex > -1,
        [`fl-header-${isShow ? 'light' : theme}`]: theme || isShow,
      })}
    >
      <div
        className={classNames('fl-header-logo', {
          'fl-header-logo-hover': currentIndex > -1 || theme !== 'default',
        })}
        onClick={() => {
          history.push('/');
        }}
      >
        {/* <img
          src={currentIndex > -1 || theme !== 'default' ? logoActive : logo}
          alt="泛联·HYPCON"
        /> */}
      </div>
      <div
        className="fl-header-menu"
        onMouseLeave={() => {
          setCurrentIndex(-1);
          setCascaderData([]);
          setImagesSwiperArr([]);
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
                if (currentIndex !== index) {
                  setCascaderData([]);
                  setImagesSwiperArr([]);
                }
                setCurrentIndex(index);
              }}
            >
              <span className="menu-title">{item.title}</span>
              <div className="menu-icon"></div>
              {/* <ReactSVG className="menu-icon" src={downArrow}></ReactSVG> */}
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
                            data: [
                              ...(child.products || []),
                              ...(child.children || []),
                            ],
                          },
                        ]);
                      } else {
                        setCascaderData([]);
                      }
                    }}
                    onClick={() => {
                      setCurrentIndex(-1);
                      goPage(child);
                    }}
                  >
                    <div className="fl-header-cascader-menus-menu-title">
                      {child.name || child.title}
                    </div>
                    {child.children?.length > 0 && (
                      <div>
                        <RightOutlined />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {cascaderData.map((item, index) => {
              return (
                <div className={`fl-header-cascader-menus`} key={index}>
                  {item.data.map((child, idx) => {
                    return (
                      <div
                        className={classNames('fl-header-cascader-menus-menu', {
                          active:
                            cascaderData?.[index + 1]?.key ===
                            index + 1 + '-' + idx,
                        })}
                        key={idx}
                        onMouseEnter={() => {
                          setImagesSwiperArr(child.images || []);
                          if (
                            child.children?.length > 0 ||
                            child.products?.length > 0
                          ) {
                            cascaderData[index + 1] = {
                              key: index + 1 + '-' + idx,
                              data: [
                                ...(child.products || []),
                                ...(child.children || []),
                              ],
                            };
                            setCascaderData([...cascaderData]);
                          } else {
                            setCascaderData(cascaderData.slice(0, index + 1));
                          }
                        }}
                        onMouseLeave={() => {
                          setImagesSwiperArr([]);
                        }}
                        onClick={() => {
                          goPage(child);
                          setCurrentIndex(-1);
                        }}
                      >
                        <div className="fl-header-cascader-menus-menu-title">
                          {child.name || child.title}
                        </div>
                        {(child.children?.length || child?.products?.length) >
                          0 && (
                          <div>
                            <RightOutlined />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* 2级子项 */}
            {/* {cascaderData[0] && (
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
                      {child.name}
                    </div>
                    {child.children && (
                      <div>
                        <RightOutlined />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )} */}

            {/* 3级子项 */}
            {/* {cascaderData[1] && (
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
            )} */}
          </div>
          {(
            <div className="fl-header-cascader-swiper">
            {imagesSwiperArr?.length > 0 &&  <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                  delay: 1000,
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
                {imagesSwiperArr?.map((item) => {
                  return (
                    <SwiperSlide key={item}>
                      <img className="" src={item} alt="" />
                    </SwiperSlide>
                  );
                })}
              </Swiper>}
            </div>
          )}
        </div>
      </div>
      <div className="fl-header-right">
        <div className="fl-header-right-logo">
          <img
            src={
              currentIndex > -1 || theme !== 'default' || isShow
                ? zkxxActive
                : zkxx
            }
            alt=""
          />
        </div>
        <div
          className="fl-header-right-search"
          onClick={() => {
            history.push('/search');
          }}
        >
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
