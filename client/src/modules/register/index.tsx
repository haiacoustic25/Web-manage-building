import '../../assets/styles/register.scss';
import logo from '../../assets/img/logo.png';

import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
// import { login } from '../../redux/actions/authAction';
import { AuthType } from '../../types/UserType';
import { useEffect } from 'react';
import { APISTATUS } from '../../constants/ApiStatus';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Radio, Row } from 'antd';
import { url } from '../../routes/listRouter';
import { useLoginMutation, useRegisterMutation } from '../../api/authApi';
import { login } from '../../redux/reducer/authReducer';
import { Link } from 'react-router-dom';
import SelectAddress from '../../components/selectAddress';
import { AvatarPicker } from '../../components/AvatarPicker/AvatarPicker';
export const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [registerData, registerResultData] = useRegisterMutation();
  const { data, isSuccess, isError, isLoading } = registerResultData;

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(data));
      navigation(url.dashboard);
      toast.success('Đăng nhập thành công');
    }
    if (isError) {
      toast.error('Đăng nhập thất bại');
    }
  }, [isSuccess]);

  const handleRegister = (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }
    registerData(formData);
  };

  const onChangePickAvatar = (value: any) => {
    form.setFieldsValue({ file: value?.file });
  };

  return (
    <div className="registerWrap">
      <div className="registerWrap__form">
        <div className="registerWrap__form--img">
          <img src={logo} alt="" />
        </div>
        <div className="break-line"></div>
        <Form
          layout="vertical"
          form={form}
          preserve={false}
          onFinish={handleRegister}
          style={{ width: 500 }}
        >
          <Row gutter={10}>
            <Col span={6}>
              <Form.Item label="Avatar" name="file" style={{ marginBottom: '10px' }}>
                <AvatarPicker
                  // value1={customerSelect?.avatar}
                  width={100}
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
                    style={{ marginBottom: '10px' }}
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
                    style={{ marginBottom: '10px' }}
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
            style={{ marginBottom: '10px' }}
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: '10px' }}
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <SelectAddress required={true} />
          {/* <Row>
            <Col span={12}>
              <Form.Item
                style={{ marginBottom: '10px' }}
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <Radio.Group>
                  <Radio value={1}> Nữ </Radio>
                  <Radio value={2}> Nam </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row> */}
          <Form.Item style={{ justifyContent: 'center', display: 'flex' }}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>Bạn đã có tài khoản?</div>
          <Link to="/login">Đăng nhập</Link>
        </div>
        {/* <div className="copy-right">© Hồ Minh Hải</div> */}
      </div>
    </div>
  );
};
