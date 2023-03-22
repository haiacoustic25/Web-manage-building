import { Button, Form, Input, Modal, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAddBuildingMutation } from '../../../api/buildingApi';
import SelectAddress from '../../../components/selectAddress';
import { APIAddress } from '../../../constants/APIAdress';

type Props = {
  isModalOpen: boolean;
  userId: string;
  handleOk: () => void;
  handleCancel: () => void;
};

const ModalAddBuilding = ({ isModalOpen, handleOk, handleCancel, userId }: Props) => {
  const [form] = Form.useForm();
  const [handleAdd, resultAdd] = useAddBuildingMutation();
  const { data, isSuccess, isError, isLoading } = resultAdd;

  const onFinish = (value: any) => {
    handleAdd({ userId, ...value, amountRooms: Number(value.amountRooms) });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Thêm thành công!');
    }
    if (isError) {
      toast.error('Thêm thất bại!');
    }
  }, [isSuccess]);
  return (
    <Modal
      title="Thêm tòa nhà"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        //   initialValues="vertical"
        //   onValuesChange={onFormLayoutChange}
        style={{ maxWidth: 600 }}
      >
        <SelectAddress required={true} />

        <Form.Item
          label="Số phòng"
          name="amountRooms"
          style={{ marginBottom: '10px', width: '50%' }}
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Input type="number" placeholder="Nhập số phòng" />
        </Form.Item>

        <Form.Item style={{ justifyContent: 'end', display: 'flex' }}>
          <Button style={{ marginRight: '10px' }}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Đồng ý
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddBuilding;
