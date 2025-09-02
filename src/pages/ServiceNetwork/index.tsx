import Header from "@/components/Header";

import bgImg from './images/bg.png'

import "./index.less";
import ChinaMapChart from "@/components/Map";

const ServiceNetwork = () => {
    return (
        <div className="fl-service-network">
            <Header className="fl-service-network-header" />
            <div className="fl-service-network-bg">
                <div className="fl-service-network-bg-img">
                    <img src="" alt="" />
                </div>
                <div className="fl-service-network-bg-title">
                    服务网络
                </div>
            </div>
            <div className="fl-service-network-map">
                <img src={bgImg} alt="" />
                <div className="fl-service-network-map-content">
                    <ChinaMapChart />
                </div>
            </div>
            
        </div>
    )
}

export default ServiceNetwork;