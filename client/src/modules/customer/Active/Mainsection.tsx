import {
  DeleteOutlined,
  EditFilled,
  EllipsisOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetAllCustomerQuery, useRemoveCustomerMutation } from '../../../api/customerApi';
import { useGetAllRoomQuery } from '../../../api/roomApi';
import SearchWrapper from '../../../components/searchWrapper';
import SelectAddress from '../../../components/selectAddress';
import { BASE_URL_AVT } from '../../../constants/config';
import { RootState, useAppSelector } from '../../../redux/store';
import { CustomerType } from '../../../types/CustomerType';
import { displayAddress } from '../../../utils';
import formatDate from '../../../utils/formatDate';
import ModalCustomer from '../modal/ModalCustomer';

interface DataType {
  avatar: string;
  key: string;
  name: string;
  gender: Number;
  address: string;
  citizenIdentificationNumber: string;
  status: string;
  dateOfEntryDisplay: any;
}

const { RangePicker } = DatePicker;

const Mainsection = () => {
  const { confirm } = Modal;
  const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
  const { data: dataRoom } = useGetAllRoomQuery({
    buildingId,
    priceFrom: '',
    priceTo: '',
    areaFrom: '',
    areaTo: '',
    status: '',
  });
  const [form] = Form.useForm();
  const [customerSelect, setCustomerSelect] = useState<CustomerType | null>(null);
  const [handleRemove, resultRemove] = useRemoveCustomerMutation();
  const [filter, setFilter] = useState({
    // userId: user?.id,
    buildingId,
    name: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    citizenIdentificationNumber: '',
    email: '',
    status: 1,
    gender: '',
    roomId: '',
    dateStart: '',
    dateEnd: '',
    pageIndex: 1,
    pageSize: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isFetching } = useGetAllCustomerQuery(filter, {
    skip: !filter,
    refetchOnMountOrArgChange: true,
    // pollingInterval: 1000,
  });
  const _refetchSearch = () => {
    setFilter({
      buildingId,
      name: '',
      phone: '',
      city: '',
      district: '',
      ward: '',
      citizenIdentificationNumber: '',
      email: '',
      status: 1,
      gender: '',
      roomId: '',
      dateStart: '',
      dateEnd: '',
      pageIndex: 1,
      pageSize: 10,
    });
    form.setFieldsValue({
      buildingId,
      name: '',
      phone: '',
      city: '',
      district: '',
      ward: '',
      citizenIdentificationNumber: '',
      email: '',
      gender: '',
      roomId: '',
      dateStart: '',
      dateEnd: '',
    });
  };
  const _showModalCustomer = () => {
    setIsModalOpen(true);
    if (customerSelect) setCustomerSelect(null);
  };

  const _handleCancelCustomer = () => {
    // setRoomSelect(null);
    setIsModalOpen(false);
  };

  const _handleSearch = (values: any) => {
    for (const key in values) {
      if (!values[key]) values[key] = '';
    }
    const valuesFilter = { ...values };
    if (valuesFilter.city == -1) valuesFilter.city = '';
    if (valuesFilter.district == -1) valuesFilter.district = '';
    if (valuesFilter.ward == -1) valuesFilter.ward = '';
    if (valuesFilter.date) {
      valuesFilter.dateStart = dayjs(values.date[0]).format('YYYY-MM-DD');
      valuesFilter.dateEnd = dayjs(values.date[1]).format('YYYY-MM-DD');
    }
    setFilter({ ...filter, pageIndex: 1, ...valuesFilter });
  };
  const handleChangePage = (page: any) => {
    setFilter({ ...filter, pageIndex: page });
  };
  const showConfirm = (item: any) => {
    confirm({
      title: 'Xóa',
      icon: <DeleteOutlined style={{ color: 'red' }} />,
      content: 'Bạn có muốn xóa không?',
      okText: 'Đồng ý',
      // confirmLoading:isLoading,
      cancelText: 'Hủy',
      onOk() {
        handleRemove({ id: item.id });
        // _handleRemove(item.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    if (resultRemove.isSuccess) toast.success('Xóa người thuê thành công !');
    if (resultRemove.isError) toast.error('Xóa người thuê thất bại !');
  }, [resultRemove]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: '50px',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="ms__table--name">
          <div className="ms__table--img">
            <img src={BASE_URL_AVT + record.avatar} alt="" />
          </div>
          <span>{text}</span>
        </div>
      ),
    },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => {
        if (text == 1) return <p>Nữ</p>;
        return <p>Nam</p>;
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Căn cước công dân',
      dataIndex: 'citizenIdentificationNumber',
      key: 'citizenIdentificationNumber',
    },
    {
      title: 'Tên phòng',
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'Ngày ở',
      dataIndex: 'dateOfEntry',
      key: 'dateOfEntry',
      render: (text) => <p>{formatDate(text, 'dd/MM/yyyy')}</p>,
    },

    {
      // title: 'Hành động',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Dropdown menu={{ items: items(record) }} placement="bottomLeft" arrow>
            <Button shape="circle" icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const renderContent = () => {
    return data?.data?.map((item: CustomerType, index: number) => {
      return {
        key: (filter.pageIndex - 1) * filter.pageSize + index + 1,
        address: displayAddress(item),
        ...item,
      };
    });
  };

  const items = (item: any) => {
    return [
      {
        key: '1',
        icon: <EditFilled />,
        label: 'Sửa',
        onClick: () => {
          _showModalCustomer();
          setCustomerSelect(item);
          // _handleSelectBuilding(item);
        },
      },
      {
        key: '2',
        icon: <DeleteOutlined style={{ color: 'red' }} />,
        label: 'Xóa',
        onClick: () => showConfirm(item),
      },
    ];
  };
  return (
    <>
      <SearchWrapper>
        <div className="customer-search">
          <Form layout="vertical" form={form} onFinish={_handleSearch}>
            <Row gutter={10}>
              <Col span={6}>
                <Form.Item label="Họ và tên" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Giới tính" name="gender">
                  <Select
                    style={{ width: '100%' }}
                    // onChange={onGenderChange}
                    // allowClear
                  >
                    <Select.Option value={-1}>Tất cả</Select.Option>
                    <Select.Option value={1}>Nữ</Select.Option>
                    <Select.Option value={2}>Nam</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Căn cước công dân" name="citizenIdentificationNumber">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Số điện thoại" name="phoneNumber">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item label="Ngày ở" name="date">
                  <RangePicker
                    style={{ width: '100%' }}
                    showTime
                    format="YYYY/MM/DD"
                    // value={[moment(dateRange.from), moment(dateRange.to)]}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Chọn phòng trọ" name="roomId">
                  <Select style={{ width: '100%' }}>
                    <Select.Option value={-1}>Tất cả</Select.Option>
                    {dataRoom?.data.map((_: any) => (
                      <Select.Option value={_.id}>{_.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <SelectAddress mode="filter" />

            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
            <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={_refetchSearch}>
              <Tooltip title="Tải lại">
                <ReloadOutlined style={{ color: '#d9d9d9' }} />
              </Tooltip>
            </span>
          </Form>
        </div>
      </SearchWrapper>
      <div className="customer-content">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          className="customer-content__add"
          onClick={_showModalCustomer}
        >
          Thêm
        </Button>
        <Table
          bordered
          columns={columns}
          dataSource={renderContent()}
          loading={isFetching}
          pagination={{
            position: ['bottomRight'],
            pageSize: 10,
            simple: true,
            onChange: handleChangePage,
            total: data?.totalRow,
            showTotal: (total, range) => `${range[0]} - ${range[1]} trong số ${total}`,
          }}
        />
      </div>
      <ModalCustomer
        isModalOpen={isModalOpen}
        handleCancel={_handleCancelCustomer}
        listRoom={dataRoom}
        customerSelect={customerSelect}
        // room={roomSelect}
        // fetchApi={_handleFetchDefaultApi}
      />
    </>
  );
};

export default Mainsection;
