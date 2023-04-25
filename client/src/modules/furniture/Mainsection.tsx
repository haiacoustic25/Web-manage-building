import {
  EditFilled,
  EllipsisOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Form, Row, Select, Space, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useGetAllRoomQuery } from '../../api/roomApi';
import SearchWrapper from '../../components/searchWrapper';
import { RootState, useAppSelector } from '../../redux/store';
//   import ModalAdd from './Modal/ModalAdd';
import { useGetAllFurnitureQuery } from '../../api/furnitureApi';
import { BASE_URL_AVT } from '../../constants/config';
import { FurnitureType } from '../../types/FurnitureType';
import { formatMoney } from '../../utils';
import formatDate from '../../utils/formatDate';
import ModalFurniture from './Modal/ModalFurniture';

interface DataType {
  key: string;
  roomName: string;
  image: string;
  name: string;
  price: String;
  status: Number; // default 0: empty, 1:hired 2//editing
  createdAt: any;
}

const Mainsection = () => {
  const [form] = Form.useForm();
  const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
  const [bookingSelect, setBookingSelect] = useState<FurnitureType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: dataRoom } = useGetAllRoomQuery({
    buildingId,
    priceFrom: '',
    priceTo: '',
    areaFrom: '',
    areaTo: '',
    status: '',
  });
  const [filter, setFilter] = useState({
    status: '',
    roomId: '',
    pageIndex: 1,
    pageSize: 10,
  });
  const { data, isFetching } = useGetAllFurnitureQuery(filter, {
    skip: !filter,
    refetchOnMountOrArgChange: true,
    // pollingInterval: 1000,
  });
  const _showModalBooking = () => {
    setIsModalOpen(true);
  };

  const _handleCancel = () => {
    // setRoomSelect(null);
    setIsModalOpen(false);
    if (bookingSelect) setBookingSelect(null);
  };
  const _handleSearch = (values: any) => {
    setFilter({ ...filter, ...values, pageIndex: 1 });
  };
  const _handleRefreshSearch = (values: any) => {
    setFilter({ status: '', roomId: '', pageIndex: 1, pageSize: 10 });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '120px',
      render: (text) => <img src={BASE_URL_AVT + text} width={'80px'} height={'80px'} alt="" />,
    },
    {
      title: 'Tên nội thất',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <p>{formatMoney(text)}</p>,
    },
    {
      title: 'Ngày sử dụng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <p>{formatDate(text, 'dd/MM/yyyy')}</p>,
    },

    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) =>
        text == 1 ? (
          <p style={{ color: '#1677ff' }}>Đang sử dụng</p>
        ) : (
          <p style={{ color: 'red' }}>Đã thanh lý</p>
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

  const handleChangePage = (page: any) => {
    setFilter({ ...filter, pageIndex: page });
  };

  const items = (item: any) => {
    return [
      {
        key: '2',
        icon: <EditFilled />,
        label: 'Sửa',
        onClick: () => {
          _showModalBooking();
          setBookingSelect(item);
          // setRoomSelect(item);
        },
      },
    ];
  };

  return (
    <>
      <SearchWrapper style={{ marginBottom: '20px' }}>
        <Form layout="vertical" form={form} onFinish={_handleSearch} preserve={false}>
          <Row gutter={10}>
            <Col span={6}>
              <Form.Item label="Chọn phòng" name="roomId">
                <Select style={{ width: '100%' }}>
                  <Select.Option value={-1}>Tất cả</Select.Option>
                  {dataRoom?.data.map((_: any) => (
                    <Select.Option value={_.id}>{_.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Trạng thái" name="status">
                <Select style={{ width: '100%' }}>
                  <Select.Option value={-1}>Tất cả</Select.Option>
                  <Select.Option value={1}>Đang sử dụng</Select.Option>
                  <Select.Option value={2}>Đã thanh lý</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
          <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={_handleRefreshSearch}>
            <Tooltip title="Tải lại">
              <ReloadOutlined style={{ color: '#d9d9d9' }} />
            </Tooltip>
          </span>
        </Form>
      </SearchWrapper>
      <div className="customer-content">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          className="customer-content__add"
          onClick={_showModalBooking}
        >
          Thêm
        </Button>
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isFetching}
          bordered
          pagination={{
            position: ['bottomRight'],
            pageSize: 10,
            simple: true,
            onChange: handleChangePage,
            total: data?.totalRow,
            showTotal: (total, range) => `${range[0]} - ${range[1]} trong số ${total}`,
          }}
          // scroll={{ y: 395 }}
        />
      </div>
      <ModalFurniture
        listRoom={dataRoom}
        isModalOpen={isModalOpen}
        handleCancel={_handleCancel}
        furnitureSelect={bookingSelect}
      />
    </>
  );
};

export default Mainsection;
