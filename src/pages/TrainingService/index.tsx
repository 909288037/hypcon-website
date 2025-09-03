import Header from '@/components/Header';
import './index.less';
const TrainingService = () => {
  return (
    <div className="training-service">
      <Header className="training-service-header" />
      <div className='training-service-bg'>
        <div className='training-service-bg-img'>
            <img src="" alt="" />
        </div>
        <div className='training-service-bg-title'>
            <div>培训服务</div>
            <div className='training-service-bg-title-desc'>基于用户业务场景与团队特性，提供线上与线下双模式培训，通过定制培训内容，双模式资源联动落地，深度解决业务痛点，助力用户团队能力与组织效能双向升级</div>
        </div>
      </div>
      <div className='training-service-content'>
        <div className='training-service-content-item'>
            <div className='training-service-content-item-title'>
                <div className='gradient-text'>线上培训</div>
            </div>
            <div className='training-service-content-item-content'>
                <div className='training-service-content-item-content-left'>
                    <div className='training-service-content-item-content-left-item'>
                        <div className='title'>线上公开课​</div>
                        <div className='desc'>​支持多终端学习，搭配专家直播答疑与交流</div>
                        <div className='tags'>
                            <div className='tag-title'>适配场景</div>
                            <div className='tag-content'>
                                <div>跨区域团队通识赋能</div>
                                <div>新员工标准化入门</div>
                            </div>
                        </div>
                    </div>
                    <div className='training-service-content-item-content-left-item'>
                        <div className='title'>线上公开课​</div>
                        <div className='desc'>​支持多终端学习，搭配专家直播答疑与交流</div>
                        <div className='tags'>
                            <div className='tag-title'>适配场景</div>
                            <div className='tag-content'>
                                <div>跨区域团队通识赋能</div>
                                <div>新员工标准化入门</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='training-service-content-item-content-right'>
                    <img src={""} alt="" />
                </div>
            </div>
        </div>
         <div className='training-service-content-item'>
            <div className='training-service-content-item-title'>
                <div className='gradient-text'>线上培训</div>
            </div>
            <div className='training-service-content-item-content'>
                <div className='training-service-content-item-content-left'>
                    <div className='training-service-content-item-content-left-item'>
                        <div className='title'>线上公开课​</div>
                        <div className='desc'>​支持多终端学习，搭配专家直播答疑与交流</div>
                        <div className='tags'>
                            <div className='tag-title'>适配场景</div>
                            <div className='tag-content'>
                                <div>跨区域团队通识赋能</div>
                                <div>新员工标准化入门</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='training-service-content-item-content-right'>
                    <img src={""} alt="" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingService;
