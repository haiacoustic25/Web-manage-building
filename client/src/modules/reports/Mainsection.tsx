import {
  CheckOutlined,
  EditFilled,
  EllipsisOutlined,
  ExportOutlined,
  ReloadOutlined,
  SearchOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Button, Col, DatePicker, Dropdown, Form, Row, Select, Space, Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import {
  useGetAllReportQuery,
  useSendEmailPaymentMutation,
  useUpdateReportMutation,
} from '../../api/reportApi';
import SearchWrapper from '../../components/searchWrapper';
import { RootState, useAppSelector } from '../../redux/store';
import { ReportType } from '../../types/ReportType';
import { formatMoney } from '../../utils';
import formatDate from '../../utils/formatDate';
import ModalDetailReport from './Modal/DetailReport';
import { toast } from 'react-toastify';
import EditReport from './Modal/EditReport';

interface DataType {
  key: string;
  roomName: String;
  payment: Number; // default 0: empty, 1:hired 2//editing
  domesticWaterNumber: Number;
  totalPayment: Number;
  electricNumber: String;
}
const { RangePicker } = DatePicker;

const Mainsection = () => {
  const [form] = Form.useForm();
  const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [filter, setFilter] = useState({
    buildingId,
    roomId: '',
    status: '',
    dateStart: '',
    dateEnd: '',
    pageIndex: 1,
    pageSize: 10,
  });
  const [handleUpdate, resultUpdate] = useUpdateReportMutation();
  const [sendEmail, resultSendEmail] = useSendEmailPaymentMutation();
  const [reportSelect, setReportSelect] = useState<ReportType | null>(null);
  // const {data,iss}
  const { data, isFetching } = useGetAllReportQuery(filter, {
    skip: !filter,
    refetchOnMountOrArgChange: true,
  });

  const _handleCancelModalDetail = () => {
    setIsOpenModalDetail(false);
    setReportSelect(null);
  };
  const _handleOpenModalDetail = (item: ReportType) => {
    setReportSelect(item);
    setIsOpenModalDetail(true);
  };
  const _handleCancelModalEdit = () => {
    setIsModalOpenEdit(false);
    setReportSelect(null);
  };
  const _handleOpenModalEdit = (item: ReportType) => {
    setReportSelect(item);
    setIsModalOpenEdit(true);
  };

  const _handleFetchDefaultApi = () => {
    setFilter({
      buildingId,
      roomId: '',
      status: '',
      dateStart: '',
      dateEnd: '',
      pageIndex: 1,
      pageSize: 10,
    });
  };
  const _handleSearch = (values: any) => {
    for (const key in values) {
      if (!values[key]) values[key] = '';
    }
    const valueFilter: any = { ...values };
    if (values.roomId == -1) valueFilter.roomId = '';
    if (values.date) {
      console.log('first');
      valueFilter.dateStart = dayjs(values.date[0]).format('YYYY-MM-DD');
      valueFilter.dateEnd = dayjs(values.date[1]).format('YYYY-MM-DD');
    }
    if (values.status == -1) valueFilter.status = '';
    setFilter({
      ...filter,
      ...valueFilter,
    });
  };

  const _handleRefetchFilter = () => {
    form.setFieldsValue({ roomId: '', status: '', dateStart: '', dateEnd: '' });
    _handleFetchDefaultApi();
  };

  const _handleAcceptPayment = (item: any) => {
    handleUpdate({ ...item, status: 2 });
  };

  useEffect(() => {
    if (resultUpdate.isSuccess) toast.success('Xác nhận thanh toán thành công.');
    if (resultUpdate.isError) toast.error('Xác nhận thanh toán thất bại.');
    if (resultSendEmail.isSuccess && resultSendEmail.data.success)
      toast.success('Gửi thông báo thành công.');
    if (resultSendEmail.isSuccess && !resultSendEmail.data.success)
      toast.error('Kết nối tài khoản email thất bại.');
    if (resultSendEmail.isError) toast.error('Gửi thông báo thất bại.');
  }, [resultUpdate, resultSendEmail]);

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
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'Số nước',
      dataIndex: 'domesticWaterNumber',
      key: 'domesticWaterNumber',
    },
    {
      title: 'Số điện',
      dataIndex: 'electricNumber',
      key: 'electricNumber',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text) => <p>{formatDate(text, 'dd/MM/yyyy')}</p>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPayment',
      key: 'totalPayment',
      render: (text) => <p>{formatMoney(text)}</p>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) =>
        text == 2 ? (
          <p style={{ color: '#1677ff' }}>Đã thanh toán</p>
        ) : (
          <p style={{ color: 'red' }}>Chưa thanh toán</p>
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
    console.log({ item });
    return [
      {
        key: '1',
        icon: <ExportOutlined />,
        label: 'Xem chi tiết',
        onClick: () => {
          _handleOpenModalDetail(item);
        },
      },
      {
        key: '2',
        icon: <CheckOutlined style={{ color: '#208B33' }} />,
        label: 'Đã thanh toán',
        onClick: () => {
          _handleAcceptPayment(item);
        },
      },
      {
        key: '3',
        icon: <EditFilled />,
        label: 'Sửa',
        onClick: () => {
          _handleOpenModalEdit(item);
          // setRoomSelect(item);
        },
      },
      {
        key: '4',
        icon: <WechatOutlined />,
        label: 'Gửi thông báo',
        onClick: () => {
          sendEmail({ id: item.id });
          // _handleOpenModalEdit(item);
          // setRoomSelect(item);
        },
      },
    ];
  };

  const renderContent = () => {
    return data?.data?.map((item: ReportType, index: number) => {
      return {
        key: index + 1,
        ...item,
      };
    });
  };
  return (
    <>
      <SearchWrapper style={{ marginBottom: '20px' }}>
        <div className="room-search">
          <Form layout="vertical" form={form} onFinish={_handleSearch} preserve={false}>
            <Row gutter={10}>
              <Col span={6}>
                <Form.Item label="Phòng" name="roomId">
                  <Select>
                    <Select.Option value={-1}>Tất cả</Select.Option>
                    {data?.data.map((item: any) => (
                      <Select.Option value={item.roomId} key={item.id}>
                        {item.roomName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Ngày tạo hóa đơn" name="date">
                  <RangePicker
                    style={{ width: '100%' }}
                    showTime
                    format="YYYY/MM/DD"
                    // value={[moment(dateRange.from), moment(dateRange.to)]}
                  />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item label="Trạng thái" name="status">
                  <Select>
                    <Select.Option value={-1}>Tất cả</Select.Option>
                    <Select.Option value={1}>Chưa thanh toán</Select.Option>
                    <Select.Option value={2}>Đã thanh toán</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

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
      <Table columns={columns} dataSource={renderContent()} loading={isFetching} />
      <ModalDetailReport
        data={reportSelect}
        isModalOpen={isOpenModalDetail}
        handleCancel={_handleCancelModalDetail}
      />
      <EditReport
        report={reportSelect}
        isModalOpen={isModalOpenEdit}
        handleCancel={_handleCancelModalEdit}
      />
    </>
  );
};

export default Mainsection;
