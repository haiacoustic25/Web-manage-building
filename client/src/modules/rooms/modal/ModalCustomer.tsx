import { Button, Col, Form, Input, Modal, Radio, Row } from 'antd';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAddCustomerMutation } from '../../../api/customerApi';
import { AvatarPicker } from '../../../components/AvatarPicker/AvatarPicker';
import SelectAddress from '../../../components/selectAddress';

type Props = {
  isModalOpen: boolean;

  fetchApi: () => void;
  handleCancel: () => void;
  room: any;
};

const ModalCustomer = ({ isModalOpen, handleCancel, room, fetchApi }: Props) => {
  const [form] = Form.useForm();
  const [handleAdd, resultAdd] = useAddCustomerMutation();
  const { isSuccess, isLoading, isError } = resultAdd;
  const onFinish = (data: any) => {
    // if (!building) return handleAdd({ userId, ...value, amountRooms: Number(value.amountRooms) });
    // return handleEdit({ id: building.id, ...value });
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }
    formData.append('status', '0');
    formData.append('roomId', room.id);
    handleAdd(formData);
  };

  const onChangePickAvatar = (value: any) => {
    form.setFieldsValue({ file: value?.file });
  };

  useEffect(() => {
    if (isError) toast.error('Thêm thất bại');
    if (isSuccess) {
      toast.success('Thêm thành công');
      handleCancel();
      fetchApi();
    }
  }, [resultAdd]);
  return (
    <Modal
      title="Thêm người thuê"
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
        <div className="mc__container">
          <Row gutter={10}>
            <Col span={6}>
              <Form.Item label="Avatar" name="file">
                <AvatarPicker
                  width={100}
                  value={null}
                  type="circle"
                  isImgDefault={true}
                  onChangePickAvatar={onChangePickAvatar}
                />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Số căn cước công dân"
            name="citizenIdentificationNumber"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input />
          </Form.Item>
          <SelectAddress required={true} />
          <Row>
            {/* <Col span={12}>
              <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <DatePicker />
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <Radio.Group>
                  <Radio value={0}> Nữ </Radio>
                  <Radio value={1}> Nam </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </div>

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

export default ModalCustomer;
