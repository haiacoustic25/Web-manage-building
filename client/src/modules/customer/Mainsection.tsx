import React, { useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import {
  DeleteFilled,
  EditFilled,
  EllipsisOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  SnippetsFilled,
  ReloadOutlined,
} from '@ant-design/icons';
import { useGetAllCustomerQuery } from '../../api/customerApi';
import { BASE_URL_AVT } from '../../constants/config';
import { ColumnsType } from 'antd/es/table';
import { CustomerType } from '../../types/CustomerType';
import { displayAddress } from '../../utils';
import formatDate from '../../utils/formatDate';
import SearchWrapper from '../../components/searchWrapper';
import SelectAddress from '../../components/selectAddress';
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
  const [form] = Form.useForm();
  const [filter, setFilter] = useState({
    // userId: user?.id,
    name: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    citizenIdentificationNumber: '',
    email: '',
    status: '',
    roomId: '',
    dateStart: '',
    dateEnd: '',
    pageIndex: 1,
    pageSize: 10,
  });
  const { data, isFetching } = useGetAllCustomerQuery(filter, {
    skip: !filter,
    refetchOnMountOrArgChange: true,
    // pollingInterval: 1000,
  });
  const _refetchSearch = () => {
    setFilter({
      name: '',
      phone: '',
      city: '',
      district: '',
      ward: '',
      citizenIdentificationNumber: '',
      email: '',
      status: '',
      roomId: '',
      dateStart: '',
      dateEnd: '',
      pageIndex: 1,
      pageSize: 10,
    });
  };
  const _handleSearch = (values: any) => {
    const valuesFilter = { ...values };
    if (valuesFilter.city == -1) valuesFilter.city = '';
    if (valuesFilter.district == -1) valuesFilter.district = '';
    if (valuesFilter.ward == -1) valuesFilter.ward = '';

    setFilter({ ...filter, pageIndex: 1, ...valuesFilter });
  };
  const handleChangePage = (page: any) => {
    setFilter({ ...filter, pageIndex: page });
  };

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
        if (text == 0) return <p>Nữ</p>;
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
      title: 'Ngày ở',
      dataIndex: 'dateOfEntryDisplay',
      key: 'dateOfEntryDisplay',
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
        dateOfEntryDisplay: formatDate(item?.dateOfEntry, 'dd/MM/yyyy'),
        ...item,
      };
    });
  };

  const items = (item: any) => {
    return [
      {
        key: '1',
        icon: <SnippetsFilled />,
        label: 'Xem chi tiết',
        onClick: () => {
          // _showDrawer();
          // _handleSelectBuilding(item);
        },
      },
      {
        key: '2',
        icon: <EditFilled />,
        label: 'Sửa',
        onClick: () => {
          // showModal();
          // _handleSelectBuilding(item);
        },
      },
      {
        key: '3',
        icon: <DeleteFilled style={{ color: 'red' }} />,
        label: 'Xóa',
        // onClick: () => showConfirm(item),
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
                    <Select.Option value={0}>Nam</Select.Option>
                    <Select.Option value={1}>Nữ</Select.Option>
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
                <Form.Item label="Ngày ở">
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Chọn tòa nhà" name="gender">
                  <Select
                    style={{ width: '100%' }}
                    // onChange={onGenderChange}
                    // allowClear
                  >
                    <Select.Option value={-1}>Tất cả</Select.Option>
                    <Select.Option value={0}>Nam</Select.Option>
                    <Select.Option value={1}>Nữ</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Chọn phòng trọ" name="gender">
                  <Select
                    style={{ width: '100%' }}
                    // onChange={onGenderChange}
                    // allowClear
                  >
                    <Select.Option value={-1}>Tất cả</Select.Option>
                    <Select.Option value={0}>Nam</Select.Option>
                    <Select.Option value={1}>Nữ</Select.Option>
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
          // onClick={showModal}
        >
          Thêm
        </Button>
        <Table
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
    </>
  );
};

export default Mainsection;
