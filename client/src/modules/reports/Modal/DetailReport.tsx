import { Modal } from 'antd';
import React from 'react';
import { formatMoney } from '../../../utils';
import '../../../assets/styles/payment.scss';

type Props = {
  data: any;
  isModalOpen: boolean;
  handleCancel: () => void;
};

const ModalDetailReport = ({ data, isModalOpen, handleCancel }: Props) => {
  return (
    <Modal title="Xem chi tiết" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <div className="payment__infor">
        <div className="item">
          <h5 className="label">Tên phòng: </h5>
          <span>{data?.roomName}</span>
        </div>
        <div className="item">
          <h5 className="label">Tổng tiền: </h5>
          <span>{formatMoney(data?.totalPayment | 0)}</span>
        </div>
        <div className="item">
          <h5 className="label">Giá phòng: </h5>
          <span>{formatMoney(data?.payment | 0)}</span>
        </div>
        <div className="item">
          <h5 className="label">Tiền mạng: </h5>
          <span>{formatMoney(data?.internetFee | 0)}</span>
        </div>
        <div className="item">
          <h5 className="label">Tiền điện: </h5>
          <span>{formatMoney((data?.electricFee * data?.electricNumber) | 0)}</span>
        </div>
        <div className="item">
          <h5 className="label">Tiền nước: </h5>
          <span>{formatMoney((data?.domesticWaterFee * data?.domesticWaterNumber) | 0)}</span>
        </div>
        <div className="item">
          <h5 className="label">Tiền vệ sinh: </h5>
          <span>{formatMoney(data?.environmentFee | 0)}</span>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailReport;
