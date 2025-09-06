import rightArrowImg from '@/assets/images/right-arrow.png';
import { history } from '@umijs/max';
import './index.less';
interface CardProps {
  type?: 'view' | 'download';
}
const Card: React.FC<CardProps> = ({ type = 'view', dataSource }) => {
  if (type === 'download') {
    return (
      <div
        className="card-download"
        onClick={() => {
          if (dataSource.detailType === '0') {
            history.push(`/download/?search=${dataSource.name}`);
            return;
          }
          // 跳转软件详情
          if (dataSource.type === '0') {
            history.push(`/product/${dataSource.type}/${dataSource.id}`);
          } else if (dataSource.type === '1') {
            // 跳转硬件详情
            history.push(
              `/product-hardware/${dataSource.type}/${dataSource.id}`,
            );
          }
        }}
      >
        <div className="card-download-header">
          <img src={dataSource?.image} alt="" />
        </div>
        <div className="card-download-body">
          <div className="card-download-body-title">{dataSource?.name}</div>
          <div
            className="card-download-body-desc"
            dangerouslySetInnerHTML={{
              __html: dataSource?.description,
            }}
          ></div>
        </div>
        <div className="card-download-btn"></div>
      </div>
    );
  }
  return (
    <div
      className="card"
      onClick={() => {
        // 跳转软件详情
        if (dataSource.type === '0') {
          history.push(`/product/${dataSource.type}/${dataSource.id}`);
        } else if (dataSource.type === '1') {
          // 跳转硬件详情
          history.push(`/product-hardware/${dataSource.type}/${dataSource.id}`);
        }
      }}
    >
      <div className="card-header">
        <img src={dataSource?.image} alt="" />
      </div>
      <div className="card-body">
        <div className="card-body-title">{dataSource?.name}</div>
        <div
          className="card-body-desc"
          dangerouslySetInnerHTML={{
            __html: dataSource?.description,
          }}
        ></div>
      </div>
      <div className="card-footer">
        <div className="card-footer-btn">
          <img src={rightArrowImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Card;
