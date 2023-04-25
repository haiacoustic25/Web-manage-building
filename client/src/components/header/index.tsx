import { DashboardOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/img/logo.png';
import { BASE_URL_AVT } from '../../constants/config';
import { logout } from '../../redux/reducer/authReducer';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import '../../assets/styles/layoutWrapper.scss';
type Props = {
  hasToDashboard?: boolean;
};

const Header = ({ hasToDashboard = true }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.dataUser.user);
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

export default Header;
