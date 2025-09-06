import Header from '@/components/Header';
import { getTrainingService } from '@/services/ServiceNetwork';
import { useRequest } from '@umijs/max';
import './index.less';
const TrainingService = () => {
  // 获取培训服务数据
  const { data, error, loading } = useRequest(() => {
    return getTrainingService();
  });

  return (
    <div className="training-service">
      <Header className="training-service-header" />
      <div className="training-service-bg">
        <div className="training-service-bg-img">
          <img src={data?.image} alt="" />
        </div>
        <div className="training-service-bg-title">
          <div>{data?.title}</div>
          <div
            className="training-service-bg-title-desc"
            dangerouslySetInnerHTML={{
              __html: data?.detail,
            }}
          ></div>
        </div>
      </div>
      <div className="training-service-content">
        <div className="training-service-content-item">
          <div className="training-service-content-item-title">
            <div className="gradient-text">线上培训</div>
          </div>
          <div className="training-service-content-item-content">
            <div className="training-service-content-item-content-left">
              {data?.on?.data?.map((item, index) => {
                return (
                  <div
                    key={item.title}
                    className="training-service-content-item-content-left-item"
                  >
                    <div className="title">{item.title}</div>
                    <div className="desc">{item.second}</div>
                    {item.sceneList && (
                      <div className="tags">
                        <div className="tag-title">适配场景</div>
                        <div className="tag-content">
                          {item.sceneList?.map((tag) => {
                            return <div key={tag.title}>{tag.title}</div>;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="training-service-content-item-content-right">
              <img src={data?.on?.image} alt="" />
            </div>
          </div>
        </div>
        {data?.off && (
          <div className="training-service-content-item">
            <div className="training-service-content-item-title">
              <div className="gradient-text">线下培训</div>
            </div>
            <div className="training-service-content-item-content">
              <div className="training-service-content-item-content-left">
                {data?.off?.data?.map((item, index) => {
                  return (
                    <div
                      key={item.title}
                      className="training-service-content-item-content-left-item"
                    >
                      <div className="title">{item.title}</div>
                      <div className="desc">{item.second}</div>
                      {item.sceneList && (
                        <div className="tags">
                          <div className="tag-title">适配场景</div>
                          <div className="tag-content">
                            {item.sceneList?.map((tag) => {
                              return <div key={tag.title}>{tag.title}</div>;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {data?.off?.image && (
                <div className="training-service-content-item-content-right">
                  <img src={data?.off?.image} alt="" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingService;
