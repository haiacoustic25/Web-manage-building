import { Collapse } from 'antd';
import '../../assets/styles/searchWrapper.scss';

const { Panel } = Collapse;

type Props = {
  children: React.ReactNode;
};

const SearchWrapper = ({ children }: Props) => {
  return (
    <Collapse defaultActiveKey={['1']} expandIconPosition="end">
      <Panel header="Tìm kiếm" key="1">
        <div>{children}</div>
      </Panel>
    </Collapse>
  );
};

export default SearchWrapper;
