import '../../assets/styles/login.scss';
import logo from '../../assets/img/logo.png';

import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
// import { login } from '../../redux/actions/authAction';
import { AuthType } from '../../types/UserType';
import { useEffect } from 'react';
import { APISTATUS } from '../../constants/ApiStatus';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { url } from '../../routes/listRouter';
import { useLoginMutation } from '../../api/authApi';
import { login } from '../../redux/reducer/authReducer';
export const Login = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [loginData, loginResultData] = useLoginMutation();
  const { data, isSuccess, isError, isLoading } = loginResultData;

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(data));
      navigation(url.statistical);
      toast.success('Đăng nhập thành công');
    }
    if (isError) {
      toast.error('Đăng nhập thất bại');
    }
  }, [isSuccess]);

  const handleLogin = (values: AuthType) => {
    loginData(values);
  };

  return (
    <div className="loginWrap">
      <div className="loginWrap__form">
        <div className="loginWrap__form--img">
          <img src={logo} alt="" />
        </div>
        <div className="break-line"></div>
        <div className="loginWrap__form--text">
          <span>Chào bạn,</span>
          <br />
          <span>Mời bạn đăng nhập vào hệ thông</span>
        </div>
        <Form
          name="basic"
          className="form-control"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={handleLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
          >
            <Input placeholder="Tên đăng nhập" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
          >
            <Input.Password placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div className="copy-right">© Hồ Minh Hải</div>
      </div>
    </div>
  );
};
