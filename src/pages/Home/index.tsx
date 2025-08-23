import TopBanner from '@/components/TopBanner';
import { useModel } from '@umijs/max';
import './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <div className="fl-home">
      {/* 首页轮播图 */}
      <div className="fl-home-banner">
        <TopBanner />
      </div>
    </div>
  );
};

export default HomePage;
