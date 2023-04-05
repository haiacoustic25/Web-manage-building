import {
  EditFilled,
  EllipsisOutlined,
  ReloadOutlined,
  SearchOutlined,
  SnippetsFilled,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Form, Input, Row, Select, Space, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { useGetAllRoomQuery } from '../../api/roomApi';
import SearchWrapper from '../../components/searchWrapper';
import { RootState, useAppSelector } from '../../redux/store';
import { RoomType } from '../../types/BuildingType';
import { formatMoney } from '../../utils';
import ModalCustomer from './modal/ModalCustomer';
import ModalEditRoom from './modal/ModalEditRoom';

interface DataType {
  key: string;
  name: String;
  status: Number; // default 0: empty, 1:hired 2//editing
  amountOfPeople: Number;
  payment: Number;
  area: Number;
  buildingId: String;
  electricNumber: String;
  motorbikeAmount: Number;
  domesticWaterFee: Number;
}

const Mainsection = () => {
  const [form] = Form.useForm();
  const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [filter, setFilter] = useState({
    buildingId,
    priceFrom: '',
    priceTo: '',
    areaFrom: '',
    areaTo: '',
    status: '',
  });
  console.log({ filter });
  // console.log({ building });
  const [isModalOpenAddCustomer, setIsModalOpenAddCustomer] = useState(false);
  const [roomSelect, setRoomSelect] = useState<RoomType | null>(null);
  const { data, isFetching } = useGetAllRoomQuery(filter, {
    skip: !filter,
    refetchOnMountOrArgChange: true,
    // pollingInterval: 1000,
  });
  const _handleFetchDefaultApi = () => {
    setFilter({
      buildingId,
      priceFrom: '',
      priceTo: '',
      areaFrom: '',
      areaTo: '',
      status: '',
    });
  };
  const _handleSearch = (values: any) => {
    console.log({ values });
    if (values.status == '-1')
      return setFilter({
        buildingId,
        ...values,
        status: '',
      });
    return setFilter({
      buildingId,
      ...values,
    });
  };

  const _handleRefetchFilter = () => {
    form.setFieldsValue({ priceFrom: '', priceTo: '', areaFrom: '', areaTo: '', status: '' });
    _handleFetchDefaultApi();
  };

  const _showModal = () => {
    setIsModalOpenAdd(true);
  };

  const _handleCancel = () => {
    setRoomSelect(null);
    setIsModalOpenAdd(false);
  };
  const _showModalCustomer = () => {
    setIsModalOpenAddCustomer(true);
  };

  const _handleCancelCustomer = () => {
    setRoomSelect(null);
    setIsModalOpenAddCustomer(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: '70px',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số người',
      dataIndex: 'amountOfPeople',
      key: 'amountOfPeople',
    },
    {
      title: 'Diện tích (m2)',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Số lượng xe máy',
      dataIndex: 'motorbikeAmount',
      key: 'motorbikeAmount',
    },
    {
      title: 'Giá phòng',
      dataIndex: 'paymentDisplay',
      key: 'paymentDisplay',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) =>
        text == 0 ? (
          <p style={{ color: '#1677ff' }}> Đang trống</p>
        ) : (
          <p style={{ color: 'red' }}>Đã thuê</p>
        ),
    },
    {
      // title: 'Hành động',
      key: 'action',
      align: 'right',
      width: '50px',
      render: (_, record) => (
        <Space size="middle">
          <Dropdown menu={{ items: items(record) }} placement="bottomLeft" arrow>
            <Button shape="circle" icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const items = (item: any) => {
    return [
      {
        key: '1',
        icon: <SnippetsFilled />,
        label: 'Xem chi tiết',
        onClick: () => {},
      },
      {
        key: '2',
        icon: <UsergroupAddOutlined />,
        label: 'Thêm thành viên',
        onClick: () => {
          _showModalCustomer();
          setRoomSelect(item);
        },
      },
      {
        key: '3',
        icon: <EditFilled />,
        label: 'Sửa',
        onClick: () => {
          _showModal();
          setRoomSelect(item);
        },
      },
    ];
  };

  const renderContent = () => {
    return data?.data?.map((item: RoomType, index: number) => {
      return {
        key: index + 1,
        ...item,
        paymentDisplay: formatMoney(item.payment),
      };
    });
  };
  return (
    <>
      <SearchWrapper style={{ marginBottom: '20px' }}>
        <div className="room-search">
          <Form layout="vertical" form={form} onFinish={_handleSearch} preserve={false}>
            <Row gutter={10}>
              <Row className="room-search__group" gutter={10}>
                <div className="room-search__group--title">Giá phòng</div>
                <Col span={12}>
                  <Form.Item label="Giá từ:" name="priceFrom">
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Giá đến:" name="priceTo">
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="room-search__group" gutter={10}>
                <div className="room-search__group--title">Diện tích</div>
                <Col span={12}>
                  <Form.Item label="Diện tích từ:" name="areaFrom">
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Diện tích đến:" name="areaTo">
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>
            </Row>
            <Form.Item label="Trạng thái" name="status" style={{ marginTop: '10px' }}>
              <Select style={{ width: '20%' }}>
                <Select.Option value={-1}>Tất cả</Select.Option>
                <Select.Option value={0}>Đang trống</Select.Option>
                <Select.Option value={1}>Đã thuê</Select.Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
            <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={_handleRefetchFilter}>
              <Tooltip title="Tải lại">
                <ReloadOutlined style={{ color: '#d9d9d9' }} />
              </Tooltip>
            </span>
          </Form>
        </div>
      </SearchWrapper>
      <Table
        columns={columns}
        dataSource={renderContent()}
        loading={isFetching}
        bordered
        // scroll={{ y: 395 }}
      />
      <ModalEditRoom isModalOpen={isModalOpenAdd} room={roomSelect} handleCancel={_handleCancel} />
      <ModalCustomer
        isModalOpen={isModalOpenAddCustomer}
        handleCancel={_handleCancelCustomer}
        room={roomSelect}
        fetchApi={_handleFetchDefaultApi}
      />
    </>
  );
};

export default Mainsection;
