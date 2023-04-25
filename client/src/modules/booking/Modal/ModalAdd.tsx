import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import { useAddBookingMutation, useEditBookingMutation } from '../../../api/bookingApi';
import { toast } from 'react-toastify';
type Props = {
  isModalOpen: boolean;
  bookingSelect?: any;
  listRoom: any;
  //   fetchApi: () => void;
  handleCancel: () => void;
  //   room: any;
};

const ModalAdd = ({ isModalOpen, handleCancel, listRoom, bookingSelect }: Props) => {
  const [form] = Form.useForm();
  const [handleAdd, resultAdd] = useAddBookingMutation();
  const [handleEdit, resultEdit] = useEditBookingMutation();
  const onFinish = (data: any) => {
    if (!bookingSelect) {
      return handleAdd(data);
    }
    return handleEdit({ id: bookingSelect.id, ...data });
  };
  useEffect(() => {
    if (bookingSelect) {
      form.setFieldsValue(bookingSelect);
    }
  }, [bookingSelect]);
  useEffect(() => {
    if (resultAdd.isError) toast.error('Thêm thất bại');
    if (resultAdd.isSuccess) {
      toast.success('Thêm thành công');
      handleCancel();
    }
    if (resultEdit.isError) toast.error('Sửa thất bại');
    if (resultEdit.isSuccess) {
      toast.success('Sửa thành công');
      handleCancel();
    }
  }, [resultAdd, resultEdit]);
  return (
    <Modal
      title="Thêm tiền cọc"
      open={isModalOpen}
      onCancel={handleCancel}
      destroyOnClose={true}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        preserve={false}
        onFinish={onFinish}
        // style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Phòng"
          name="roomId"
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Select
            style={{ width: '100%' }}
            // onChange={onGenderChange}
            // allowClear
          >
            {listRoom?.data.map((_: any) => (
              <Select.Option value={_.id}>{_.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Số tiền"
          name="price"
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item style={{ justifyContent: 'end', display: 'flex' }}>
          <Button style={{ marginRight: '10px' }} onClick={handleCancel}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
