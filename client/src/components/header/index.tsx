import logo from '../../assets/img/logo.png';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useAppDispatch } from '../../redux/store';
import authSlice, { logout } from '../../redux/reducer/authReducer';
import renderComponentWithConfig from '../../HOC/component-with-config';
import { toast } from 'react-toastify';
import { BASE_URL_AVT } from '../../constants/config';

type Props = {
  user: any;
};

const Header = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  // const location = useLocation();
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Đăng xuất thành công');
    // navigation(url.login);
    // localStorage.removeItem("persist:root");
  };
  console.log({ user });
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: user?.name,
      // icon: <LogoutOutlined />,
    },
    {
      key: '2',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      onClick: () => handleLogout(),
    },
  ];

  return (
    <div className="header">
      <div className="header__logo">
        <img src={logo} alt="" />
      </div>
      <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
        <div className="header__avt">
          <DownOutlined style={{ fontSize: '10px' }} />
          {/* <span>Ho Minh Hai</span> */}
          <div className="header__avt--img">
            <img src={BASE_URL_AVT + user?.avatar} alt="" />
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default renderComponentWithConfig(Header);
