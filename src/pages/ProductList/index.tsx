import Header from '@/components/Header';
import './index.less';
import Card from '@/components/Card';
const ProductList = () => {
  return (
    <div className="fl-product-list">
      <Header theme="light" />
      <div className='fl-product-list-container'>
        <div className="fl-product-list-title">
          <div className="gradient-text">室内传感器</div>
        </div>
        <div className="fl-product-list-desc">
          包括水管温度传感器、水管温压力传感器、水流开关、电磁流量计、液位开关，以及水管温度传感器、水管温压力传感器、水流开关、电磁流量计、液位开关。
        </div>
      </div>
      <div className='fl-product-list-cards'>
        <Card type="download" />
        <Card type="download" />
        <Card type="download" />
        <Card type="download" />
        <Card type="download" />
        <Card type="download" />
        <Card type="download" />
        <Card type="download" />
      </div>
    </div>
  );
};

export default ProductList;
