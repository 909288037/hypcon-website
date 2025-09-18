import Header from '@/components/Header';

import bgImg from './images/bg.jpg';

import ChinaMapChart from '@/components/Map';
import { getServiceNetwork } from '@/services/ServiceNetwork';
import { useRequest } from '@umijs/max';
import './index.less';

const ServiceNetwork = () => {
  // 获取服务网络数据
  const {
    data: serviceNetworkData,
    error: serviceNetworkError,
    loading: serviceNetworkLoading,
  } = useRequest(() => {
    return getServiceNetwork();
  });
  return (
    <div className="fl-service-network">
      <Header className="fl-service-network-header" />
      <div className="fl-service-network-bg">
        <div className="fl-service-network-bg-img">
          <img src={serviceNetworkData?.image} alt="" />
        </div>
        <div className="fl-service-network-bg-title">
          {serviceNetworkData?.title}
        </div>
      </div>
      <div className="fl-service-network-map">
        <div className="fl-service-network-map-desc">
          <div
            className=" ql-editor"
            dangerouslySetInnerHTML={{
              __html: serviceNetworkData?.detail,
            }}
          ></div>
        </div>
        <img src={bgImg} alt="" className='pc-block' />
        <div className="fl-service-network-map-content ">
          <div className="img_map_box mb-block">
            <img src={bgImg} alt="" className='mb-block' />
          </div>
          <ChinaMapChart />
        </div>
      </div>
    </div>
  );
};

export default ServiceNetwork;
