import { RightOutlined } from '@ant-design/icons';
import { history, useRequest } from '@umijs/max';
import classNames from 'classnames';
import { FC, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { getProductList, getSolutionList } from '@/services/HomeController';
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
    const menu = [
      {
        title: '产品中心',
        children: productList,
      },
      {
        title: '解决方案',
        children: solutionList?.map((item) => {
          return {
            ...item,
            isSolution: true,
            name: item.title,
          };
        }),
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
      },
    ];
    return menu;
  }, [productList, solutionList]);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [cascaderData, setCascaderData] = useState([]);
  const [imagesSwiperArr, setImagesSwiperArr] = useState([]);
  console.log('🚀 ~ Header ~ imagesSwiperArr:', imagesSwiperArr);
  // 跳转页面
  const goPage = (item: any) => {
    console.log('🚀 ~ goPage ~ item:', item);
    // 跳转解决方案
    if (item.isSolution) {
      history.push(`/solution/${item.id}`);
      return;
    }
    // 跳转产品列表
    if (item.products?.length > 0) {
      if (item.products.image) {
        // 有分类图
        history.push(`/product`);
      } else {
        // 无分类图
        history.push(`/product-list`);
      }
      return;
    }
    // 本地导航跳转
    if (item.url) {
      history.push(item.url);
      return;
    }
    // 外链
    if (item.detailType === '2') {
      window.open(item.link);
      return;
    }
    // 跳转软件详情
    if (item.type === '0') {
      history.push(`/product/${item.type}/${item.id}`);
    } else if (item.type === '1') {
      // 跳转硬件详情
      history.push(`/product-hardware/${item.type}/${item.id}`);
    }
  };
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
                }
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
                      console.log('child', child);

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
                      goPage(child);
                    }}
                  >
                    <div className="fl-header-cascader-menus-menu-title">
                      {child.name || child.title}
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
                          if (child.children || child.products) {
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
                        onClick={() => {
                          goPage(child);
                        }}
                      >
                        <div className="fl-header-cascader-menus-menu-title">
                          {child.name || child.title}
                        </div>
                        {child.children && (
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
          {imagesSwiperArr.length > 0 && (
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
                {imagesSwiperArr?.map((item) => {
                  return (
                    <SwiperSlide key={item}>
                      <img
                        src={item}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}
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
