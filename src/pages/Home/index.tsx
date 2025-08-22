import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <div className='fl-home'>
      213123
    </div>
  );
};

export default HomePage;
