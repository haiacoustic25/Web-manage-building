import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useEditRoomMutation } from '../../../api/roomApi';

type Props = {
  isModalOpen: boolean;
  room: any;
  // handleOk: () => void;
  handleCancel: () => void;
};

const ModalEditRoom = ({ isModalOpen, handleCancel, room }: Props) => {
  const [form] = Form.useForm();
  const [handleEdit, resultEdit] = useEditRoomMutation();
  const onFinish = (value: any) => {
    handleEdit({
      id: room.id,
      area: Number(value.area),
      motorbikeAmount: Number(value.motorbikeAmount),
      payment: Number(value.payment),
    });
  };
  useEffect(() => {
    if (resultEdit.isSuccess) {
      handleCancel();
      toast.success('Sửa thành công!');
    }
    if (resultEdit.isError) {
      toast.error('Sửa thất bại!');
    }
  }, [resultEdit]);
  useEffect(() => {
    if (room) {
      form.setFieldsValue(room);
    }
  }, [room]);
  return (
    <Modal
      title="Sửa thông tin phòng"
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
        style={{ maxWidth: 600 }}
      >
        <div style={{ padding: '10px 0' }}>
          <span style={{ marginRight: '30px' }}>Tên phòng:</span>
          <span style={{ fontSize: '16px', fontWeight: '700' }}>{room?.name}</span>
        </div>

        <Form.Item
          label="Diện tích (m2)"
          name="area"
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Giá tiền"
          name="payment"
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Số lượng xe máy"
          name="motorbikeAmount"
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Input type="number" />
        </Form.Item>
        {/* <Form.Item
          label="Giá tiền điện ( Trên 1 số )"
          name="electricityPrice"
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Input type="number" />
        </Form.Item> */}

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

export default ModalEditRoom;
