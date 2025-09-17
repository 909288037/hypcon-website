import { RightOutlined } from '@ant-design/icons';
import { history, useModel, useRequest } from '@umijs/max';
import classNames from 'classnames';
import { FC, useEffect, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { getProductList, getSolutionList } from '@/services/HomeController';
import { goPage } from '@/utils';
import { useScroll } from 'ahooks';
import { Dropdown } from 'antd';
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
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive((prev) => !prev); // 切换状态
    
  };
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
        title: '首页',
      },
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
          {
            title: '资料下载',
            url: '/download',
          },
        ],
      },
      {
        title: '新闻资讯',
        url: '/news',
        // children: [
        //   {
        //     title: '新闻动态',
        //     url: '/news',
        //   },
        // ],
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
  console.log('🚀 ~ Header ~ currentIndex:', currentIndex);
  const [cascaderData, setCascaderData] = useState([]);
  const [imagesSwiperArr, setImagesSwiperArr] = useState([]);
  console.log('🚀 ~ Header ~ imagesSwiperArr:', imagesSwiperArr);

  return (
    <header>
      <div className="pc-header">
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
              const isDropdown = ['解决方案', '关于我们', '服务支持'].includes(
                item.title,
              );
              if (isDropdown) {
                return (
                  <Dropdown
                    placement="bottom"
                    overlayClassName="fl-dropdown"
                    // trigger={['click']}
                    getPopupContainer={() => {
                      return document.querySelector('.fl-header-menu');
                    }}
                    mouseEnterDelay={0.05}
                    mouseLeaveDelay={0.03}
                    menu={{
                      items: item.children?.map((child) => {
                        return {
                          key: child.title,
                          label: child.title,
                          onClick: () => {
                            goPage(child);
                          },
                        };
                      }),
                    }}
                    key={item.title}
                  >
                    <div
                      className={classNames('fl-header-menu-item', {
                        active: currentIndex === index,
                      })}
                      style={{ height: '100%' }}
                      onMouseOver={() => {
                        if (currentIndex !== index) {
                          setCascaderData([]);
                          setImagesSwiperArr([]);
                        }
                        setCurrentIndex(index);
                      }}
                    >
                      <span className="menu-title">{item.title}</span>
                      {index !== 0 && <div className="menu-icon"></div>}
                    </div>
                  </Dropdown>
                );
              }
              return (
                <div
                  className={classNames('fl-header-menu-item', {
                    active: currentIndex === index,
                  })}
                  key={item.title}
                  onClick={() => {
                    if (index === 0) {
                      history.push('/');
                    }
                    if(item.url) {
                      history.push(item.url);
                    }
                  }}
                  onMouseOver={() => {
                    if (currentIndex !== index) {
                      setCascaderData([]);
                      setImagesSwiperArr([]);
                    }
                    setCurrentIndex(index);
                  }}
                >
                  <span className="menu-title">{item.title}</span>
                  {!['首页', '新闻资讯'].includes(item.title) && <div className="menu-icon"></div>}
                  {/* <ReactSVG className="menu-icon" src={downArrow}></ReactSVG> */}
                </div>
              );
            })}
            {/* 下拉菜单 */}

            {!['首页', '新闻资讯'].includes(menuArr[currentIndex]?.title) &&
              !['解决方案', '关于我们', '服务支持'].includes(
                menuArr[currentIndex]?.title,
              ) && (
                <div className="fl-header-dropdown">
                  <div className="fl-header-cascader-box">
                    {menuArr[currentIndex]?.children?.length > 0 && (
                      <div className={`fl-header-cascader-menus`}>
                        {menuArr[currentIndex]?.children?.map(
                          (child, index) => (
                            <div
                              className={classNames(
                                'fl-header-cascader-menus-menu',
                                {
                                  active: cascaderData?.[0]?.key === index,
                                },
                              )}
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
                              {(child.children?.length ||
                                child.products?.length > 0) && (
                                <div>
                                  <RightOutlined />
                                </div>
                              )}
                            </div>
                          ),
                        )}
                      </div>
                    )}

                    {cascaderData.map((item, index) => {
                      return (
                        <div className={`fl-header-cascader-menus`} key={index}>
                          {item.data.map((child, idx) => {
                            return (
                              <div
                                className={classNames(
                                  'fl-header-cascader-menus-menu',
                                  {
                                    active:
                                      cascaderData?.[index + 1]?.key ===
                                      index + 1 + '-' + idx,
                                  },
                                )}
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
                                    setCascaderData(
                                      cascaderData.slice(0, index + 1),
                                    );
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
                                {(child.children?.length ||
                                  child?.products?.length) > 0 && (
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
                  {
                    <div className="fl-header-cascader-swiper">
                      {imagesSwiperArr?.length > 0 && (
                        <Swiper
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
                        </Swiper>
                      )}
                    </div>
                  }
                </div>
              )}
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
      </div>
      <div className="mb-header">
        <div
          className={classNames('fl-header', className, 'fl-header-light-cur')}
        >
          <div
            className={classNames('fl-header-logo', {
              'fl-header-logo-hover': currentIndex > -1 || theme !== 'default',
            })}
            onClick={() => {
              history.push('/');
            }}
          ></div>
          <div className="fl-header-right">
            <div className="fl-header-right-logo">
              {' '}
              <img src={zkxxActive} alt="" />
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
            <div
              className={classNames('fl-header-right-num', { cur: isActive })}
              onClick={handleClick}
            >
              <div className="line line1"></div>
              <div className="line line2"></div>
              <div className="line line3"></div>
            </div>
          </div>
        </div>
      </div>
      {isActive && (
        <div className="fixed_nav">
          <div
            className="fl-header-menu"
            onMouseLeave={() => {
              setCurrentIndex(-1);
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
                  <div className="menu-title-icon">
                    <span className="menu-title">{item.title}</span>
                    {item.children?.length > 0 && (
                      <span className="menu-icon"></span>
                    )}
                  </div>
                  <div className="menu-content">
                    {currentIndex === index &&
                      item.children &&
                      item.children.map(
                        (childItem: any, childIndex: number) => (
                          <div
                            className="menu-content-item-menu"
                            key={childIndex}
                          >
                            <div
                              className="menu-content-item"
                              onClick={() => {
                                // 添加条件判断，如果没有子菜单则跳转
                                if (
                                  !childItem.children ||
                                  childItem.children.length === 0
                                ) {
                                  setCurrentIndex(-1);
                                  goPage(childItem);
                                }
                              }}
                            >
                              <span className="menu-content-item-title">
                                {childItem.name || childItem.title}
                              </span>
                              <div className="menu-content-item-icon"></div>
                            </div>
                            {childItem?.children?.length &&
                              childItem.children && (
                                <div className="menu-content-item-menu-box">
                                  {childItem.children.map(
                                    (childItem2: any, childIndex2: number) => {
                                      // 添加类型声明
                                      return (
                                        <div
                                          className="menu-content-item-menu-item-menu"
                                          key={childIndex2}
                                        >
                                          <div
                                            className="menu-content-item-menu-item"
                                            onClick={() => {
                                              // 同样添加条件判断
                                              if (
                                                !childItem2.children ||
                                                childItem2.children.length === 0
                                              ) {
                                                setCurrentIndex(-1);
                                                goPage(childItem2);
                                              }
                                            }}
                                          >
                                            <span className="menu-content-item-menu-title">
                                              {childItem2.name ||
                                                childItem2.title}
                                            </span>
                                            <div className="menu-content-item-menu-icon"></div>
                                          </div>
                                          <div className="menu-content-item-menu-item-menu-box">
                                            {childItem2?.children?.length &&
                                              childItem2.children.map(
                                                (
                                                  childItem3: any,
                                                  childIndex3: number, // 添加类型声明
                                                ) => (
                                                  <div
                                                    className="menu-content-item-menu-item"
                                                    key={childIndex3}
                                                    onClick={() => {
                                                      // 三级菜单直接跳转
                                                      setCurrentIndex(-1);
                                                      goPage(childItem3);
                                                    }}
                                                  >
                                                    <span className="menu-content-item-menu-title">
                                                      {childItem3.name ||
                                                        childItem3.title}
                                                    </span>
                                                    <div className="menu-content-item-menu-icon"></div>
                                                  </div>
                                                ),
                                              )}
                                          </div>
                                        </div>
                                      );
                                    },
                                  )}
                                </div>
                              )}
                          </div>
                        ),
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
