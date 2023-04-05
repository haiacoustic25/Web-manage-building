import { Collapse } from 'antd';
import '../../assets/styles/searchWrapper.scss';

const { Panel } = Collapse;

type Props = {
  children: React.ReactNode;
  style?: any;
};

const SearchWrapper = ({ children, style }: Props) => {
  return (
    <Collapse defaultActiveKey={['1']} expandIconPosition="end" style={style}>
      <Panel header="Bộ lọc" key="1">
        <div>{children}</div>
      </Panel>
    </Collapse>
  );
};

export default SearchWrapper;
