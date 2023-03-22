import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import {
  SearchOutlined,
  EditFilled,
  DeleteFilled,
  SnippetsFilled,
  EllipsisOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import SearchWrapper from '../../components/searchWrapper';
import SelectAddress from '../../components/selectAddress';
// import { useGetAllBuildingQuery } from '../../api/buildingApi';
import renderComponentWithConfig from '../../HOC/component-with-config';

import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { displayAddress } from '../../utils';
import { BuildingType } from '../../types/BuildingType';
import ModalAddBuilding from './modal/ModalAddBuilding';
import { useGetAllBuildingQuery } from '../../api/authApi';

interface DataType {
  key: string;
  address: string;
  status: string;
}

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <SnippetsFilled />,
    label: 'Xem chi tiết',
  },
  {
    key: '2',
    icon: <EditFilled />,
    label: 'Sửa',
  },
  {
    key: '3',
    icon: <DeleteFilled style={{ color: 'red' }} />,
    label: 'Xóa',
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'key',
    key: 'key',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Số phòng',
    dataIndex: 'amountRooms',
    key: 'amountRooms',
  },

  {
    // title: 'Hành động',
    key: 'action',
    align: 'right',
    render: (_, record) => (
      <Space size="middle">
        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Button shape="circle" icon={<EllipsisOutlined />} />
        </Dropdown>
      </Space>
    ),
  },
];

// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
// ];

type Props = {
  user: any;
};

const MainSection = ({ user }: Props) => {
  const [filter, setFilter] = useState({
    userId: user?.id,
    city: '',
    district: '',
    ward: '',
    pageIndex: 1,
    pageSize: 20,
  });
  const { data, isSuccess, isError, isLoading, refetch } = useGetAllBuildingQuery({});
  // const { } = resultData;
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  // console.log({ user, data, isSuccess, isError, isLoading });

  // useEffect(() => {
  //   refetch({
  //     userId: user?.id,
  //     ...filter,
  //   });
  // }, []);
  console.log(useGetAllBuildingQuery({}));

  const showModal = () => {
    setIsModalOpenAdd(true);
  };

  const handleOk = () => {
    setIsModalOpenAdd(false);
  };

  const handleCancel = () => {
    setIsModalOpenAdd(false);
  };

  const renderContent = () => {
    return data?.data?.map((item: BuildingType, index: number) => {
      return {
        key: index + 1,
        address: displayAddress(item),
        status: item.status,
        amountRooms: item.amountRooms,
      };
    });
  };

  const handleSearch = () => {
    // refetch({ userId: "d2921555-f08d-4576-abbe-cf793ba3c029" });
  };

  return (
    <>
      <SearchWrapper>
        <div className="building-search">
          <SelectAddress />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ marginTop: '20px' }}
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </div>
      </SearchWrapper>
      <div className="building-content">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          className="building-content__add"
          onClick={showModal}
        >
          Thêm
        </Button>
        <Table columns={columns} dataSource={renderContent()} loading={isLoading} />
      </div>
      <ModalAddBuilding
        userId={user?.id}
        isModalOpen={isModalOpenAdd}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default renderComponentWithConfig(MainSection);
