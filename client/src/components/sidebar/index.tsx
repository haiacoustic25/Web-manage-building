import React, { useState, useEffect, useMemo } from 'react';
import {
  UserOutlined,
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  LogoutOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import logo from '../../assets/img/logo.png';
import '../../assets/styles/sidebar.scss';
import renderComponentWithConfig from '../../HOC/component-with-config';
import { useAppDispatch } from '../../redux/store';
import authSlice from '../../redux/reducer/authReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { url } from '../../routes/listRouter';

type MenuItem = Required<MenuProps>['items'][number];
type ArrContent = {
  key: number;
  url: string;
  sub?: string;
};
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Thống kê', '0', <PieChartOutlined />),
  getItem('Quản lý phòng trọ', 'sub1', <HomeOutlined />, [
    getItem('Quản lý phòng trọ', '1'),
    getItem('Quản lý phòng trọ', '2'),
  ]),
  getItem('Quản lý người thuê', 'sub2', <UserOutlined />, [
    getItem('Quản lý người đang thuê', '3'),
    getItem('Quản lý người đã hủy', '4'),
  ]),
];

const arrContent: ArrContent[] = [
  {
    key: 0,
    url: url.statistical,
  },
  {
    key: 1,
    url: url.buildingManager,
    sub: 'sub1',
  },
  {
    key: 3,
    url: url.userManager,
    sub: 'sub2',
  },
  {
    key: 4,
    url: url.userManager,
    sub: 'sub2',
  },
];

type Props = {
  user: any;
};
const Sidebar = ({ user }: Props) => {
  // const [collapsed, setCollapsed] = useState(() => {
  //   const x = window.innerWidth;
  //   if (x < 1200) return true;
  //   return false;
  // });
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigation = useNavigate();
  useEffect(() => {
    const changeSidebar = () => {
      const x = window.innerWidth;
      if (x < 1200) setCollapsed(true);
      else setCollapsed(false);
    };
    window.addEventListener('resize', changeSidebar, true);
    return window.removeEventListener('resize', changeSidebar);
  }, []);
  console.log({ user });

  const handleNavigation = (value: any) => {
    const selectLink = arrContent.find((item) => item.key == value?.key);
    if (selectLink) {
      navigation(selectLink?.url);
    }
  };

  const selectedKey = useMemo(() => {
    // console.log(location.pathname);
    const item = arrContent.find((item) => item.url === location.pathname);
    if (item) {
      console.log(item.key);
      return item.key;
    }
    return 0;
    // return item
  }, [location.pathname]);

  const selectedSub = useMemo(() => {
    // console.log(location.pathname);
    const item = arrContent.find((item) => item.url === location.pathname);
    if (item && item.sub) {
      console.log(item.sub);
      return item.sub;
    }
    return '0';
    // return item
  }, [location.pathname]);

  return (
    <div className="sidebar">
      {/* <div className="sidebar__logo">
        <img src={logo} alt="" />
      </div>
      <div className="sidebar__info">
        <div className="sidebar__info--avt">
          <img src={logo} alt="" />
        </div>
        <span>{user.name}</span>
      </div> */}
      <Menu
        // defaultSelectedKeys={[selectedKey.toString()]}
        defaultOpenKeys={[selectedSub.toString()]}
        mode="inline"
        onClick={handleNavigation}
        inlineCollapsed={collapsed}
        items={items}
        className="sidebar__menu"
        selectedKeys={[selectedKey.toString()]}
      />

      {/* <div className="sidebar__info-responsive">
        <img src={logo} alt="" />
      </div>

      <div className="sidebar__action" onClick={handleLogout}>
        <div>
          <LogoutOutlined />
        </div>
        <span>Đăng xuất</span>
      </div> */}
    </div>
  );
};

export default renderComponentWithConfig(Sidebar);
