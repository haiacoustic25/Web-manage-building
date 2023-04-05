import LayoutWrapper from '../../components/layoutWrapper';

import '../../assets/styles/customer.scss';
import { url } from '../../routes/listRouter';
import Mainsection from './Mainsection';

export const UserComponent = () => {
  const itemHeader: any = [{ key: 1, url: url.userManager, label: 'Quản lý người đang thuê' }];
  return (
    <LayoutWrapper headers={itemHeader}>
      <Mainsection />
    </LayoutWrapper>
  );
};
