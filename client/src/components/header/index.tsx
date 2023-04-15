import { DownOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { MenuProps, Tooltip } from 'antd';
import { Dropdown } from 'antd';
import { toast } from 'react-toastify';
import renderComponentWithConfig from '../../HOC/component-with-config';
import logo from '../../assets/img/logo.png';
import { BASE_URL_AVT } from '../../constants/config';
import { logout } from '../../redux/reducer/authReducer';
import { useAppDispatch } from '../../redux/store';
import { Link } from 'react-router-dom';

type Props = {
  user: any;
  hasToDashboard?: boolean;
};

const Header = ({ user, hasToDashboard = true }: Props) => {
  const dispatch = useAppDispatch();
  // const location = useLocation();
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Đăng xuất thành công');
    // navigation(url.login);
    // localStorage.removeItem("persist:root");
  };
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
      <div className="header__left">
        {hasToDashboard && (
          <>
            <Link to="/">
              <Tooltip title="Dashboard">
                <DashboardOutlined style={{ fontSize: '20px' }} />
              </Tooltip>
            </Link>
            <div className="line-hr"></div>
          </>
        )}
        <div className="header__logo">
          <img src={logo} alt="" />
        </div>
      </div>
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        trigger={['click']}
      >
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
