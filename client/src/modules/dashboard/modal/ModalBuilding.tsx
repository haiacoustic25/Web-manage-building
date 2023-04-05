import { Button, Form, Input, Modal, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAddBuildingMutation } from '../../../api/buildingApi';
import SelectAddress from '../../../components/selectAddress';
import { APIAddress } from '../../../constants/APIAdress';
import { BuildingType } from '../../../types/BuildingType';
import { useEditBuildingMutation } from '../../../api/buildingApi';

type Props = {
  isModalOpen: boolean;
  userId: string;
  handleCancel: () => void;
  building: BuildingType | null;
};

const ModalBuilding = ({ isModalOpen, handleCancel, userId, building }: Props) => {
  const [form] = Form.useForm();
  const [handleAdd, resultAdd] = useAddBuildingMutation();
  const [handleEdit, resultEdit] = useEditBuildingMutation();
  const { data, isSuccess, isError, isLoading } = resultAdd;

  const onFinish = (value: any) => {
    handleCancel();
    if (!building) return handleAdd({ userId, ...value, amountRooms: Number(value.amountRooms) });
    return handleEdit({ id: building.id, ...value });
  };
  useEffect(() => {
    if (building) form.setFieldsValue(building);
  }, [building]);
  useEffect(() => {
    if (resultEdit.isSuccess) {
      toast.success('Sửa thành công!');
    }
    if (resultEdit.isError) {
      toast.success('Sửa Thất bại!');
    }
    if (isSuccess) {
      toast.success('Thêm thành công!');
    }
    if (isError) {
      toast.error('Thêm thất bại!');
    }
  }, [resultAdd, resultEdit]);
  return (
    <Modal
      title={building ? 'Sửa tòa nhà' : 'Thêm tòa nhà'}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        //   initialValues="vertical"
        //   onValuesChange={onFormLayoutChange}
        // style={{ maxWidth: 600 }}
      >
        <SelectAddress
          required={true}
          cityProps={building?.city}
          districtProps={building?.district}
          wardProps={building?.ward}
        />

        <Form.Item
          label="Số phòng"
          name="amountRooms"
          style={{ marginBottom: '10px', width: '50%' }}
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Input type="number" placeholder="Nhập số phòng" disabled={building ? true : false} />
        </Form.Item>

        <Form.Item style={{ justifyContent: 'end', display: 'flex' }}>
          <Button style={{ marginRight: '10px' }} onClick={handleCancel}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Đồng ý
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalBuilding;
