import { InfoCircleFilled, InfoCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Select, Tooltip } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import '../../../assets/styles/payment.scss';
import { formatMoney } from '../../../utils';
import { useAddReportMutation } from '../../../api/reportApi';
import { toast } from 'react-toastify';
import { getFurniture } from '../../../constants/Furniture';
type Props = {
  open: boolean;
  onClose: () => void;
  room: any;
};

const PaymentComponent: FunctionComponent<Props> = ({ open, onClose, room }: Props) => {
  const [form] = Form.useForm();
  const [handleAddReport, resultAddReport] = useAddReportMutation();
  const [isOpenInfor, setIsOpenInfor] = useState<Boolean>(true);
  const toggleClickSidebar = () => {
    setIsOpenInfor(!isOpenInfor);
  };
  // console.log('first', Array.isArray());

  const _handleAddReport = () => {
    const report = {
      roomId: room.id,
      ...form.getFieldsValue(),
      domesticWaterNumber: Number(form.getFieldsValue().domesticWaterNumber),
      electricNumber: Number(form.getFieldsValue().electricNumber),
    };
    handleAddReport(report);
    onClose();
    // console.log();
  };

  useEffect(() => {
    if (resultAddReport.isError) toast.error('Tạo hóa đơn thất bại');
    if (resultAddReport.isSuccess) toast.success('Tạo hóa đơn thành công');
  }, [resultAddReport]);

  useEffect(() => {
    form.setFieldsValue(room);
  }, [room]);
  // console.log({ room });
  return (
    <Drawer
      placement="right"
      width={'100%'}
      className="payment__wrapper"
      onClose={onClose}
      open={open}
      destroyOnClose={true}
      closable={true}
      closeIcon={
        <div style={{ color: '#333' }}>
          Đóng <CloseCircleOutlined />
        </div>
      }
    >
      <div className="payment">
        <div className="payment__container">
          <div className="payment__sidebar">
            <div
              className={`payment__sidebar--icon ${isOpenInfor && 'active'}`}
              onClick={toggleClickSidebar}
            >
              {!isOpenInfor ? (
                <Tooltip title="Thông tin cơ bản">
                  <InfoCircleFilled style={{ fontSize: '20px', color: '#99a8b6' }} />
                </Tooltip>
              ) : (
                <Tooltip title="Thông tin cơ bản">
                  <InfoCircleTwoTone style={{ fontSize: '20px' }} />
                </Tooltip>
              )}
            </div>
          </div>
          <div className={`payment__position ${isOpenInfor && 'active'}`}>
            <div className="close" onClick={toggleClickSidebar}></div>
            <div className="title">Thông tin cơ bản</div>
            <div className="payment__infor">
              <div className="item">
                <h5 className="label">Tên phòng: </h5>
                <span>{room?.name}</span>
              </div>
              <div className="item">
                <h5 className="label">Tầng: </h5>
                <span>{room?.floor}</span>
              </div>
              <div className="item">
                <h5 className="label">Giá phòng: </h5>
                <span>{formatMoney(room?.payment | 0)}</span>
              </div>
              <div className="item">
                <h5 className="label">Số người: </h5>
                <span>{room?.amountOfPeople}</span>
              </div>
              <div className="item">
                <h5 className="label">Tiền điện: </h5>
                <span>{formatMoney(room?.electricFee | 0)}</span>
              </div>
              <div className="item">
                <h5 className="label">Tiền nước: </h5>
                <span>{formatMoney(room?.domesticWaterFee | 0)}</span>
              </div>
              <div className="item">
                <h5 className="label">Tiền vệ sinh: </h5>
                <span>{formatMoney(room?.environmentFee | 0)}</span>
              </div>
              <div className="item">
                <h5 className="label">Tiền mạng: </h5>
                <span>{formatMoney(room?.internetFee | 0)}</span>
              </div>
              <div className="item">
                <h5 className="label">Diện tích: </h5>
                <span>
                  {room?.area} m<sup>2</sup>
                </span>
              </div>
              <div className="item">
                <h5 className="label">Nội thất: </h5>
                <span>
                  {room?.furniture?.map((item: number) => (
                    <p>- {getFurniture(item)}</p>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <div className="payment__form">
            <div className="payment__form--container">
              <Form layout="vertical" form={form} preserve={false}>
                <Form.Item label="Giá phòng" name="payment">
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item label="Số điện" name="electricNumber">
                  <Input type="number" />
                </Form.Item>
                <Form.Item label="Tiền điện (Trên 1 số)" name="electricFee">
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item label="Số nước" name="domesticWaterNumber">
                  <Input type="number" />
                </Form.Item>
                <Form.Item label="Tiền nước (Trên 1 khối)" name="domesticWaterFee">
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item label="Tiền Mạng" name="internetFee">
                  <Input type="number" disabled />
                </Form.Item>
                <Form.Item label="Tiền vệ sinh (Trên 1 người)" name="environmentFee">
                  <Input type="number" disabled />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className="payment__button">
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" onClick={_handleAddReport}>
            Lưu
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default PaymentComponent;
