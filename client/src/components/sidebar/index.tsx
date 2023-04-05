import { BarChartOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import renderComponentWithConfig from '../../HOC/component-with-config';
import '../../assets/styles/sidebar.scss';
import { useAppDispatch } from '../../redux/store';
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
  getItem('Thống kê', '0', <BarChartOutlined />),
  getItem('Quản lý phòng trọ', 'sub1', <HomeOutlined />, [getItem('Quản lý phòng trọ', '1')]),
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
    url: url.roomManager,
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

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const x = window.innerWidth;
    if (x < 1200) return true;
    return false;
  });
  // const [collapsed, setCollapsed] = useState(false);
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

  const handleNavigation = (value: any) => {
    const selectLink = arrContent.find((item) => item.key == value?.key);
    if (selectLink) {
      navigation(selectLink?.url);
    }
  };
  const selectedKey = useMemo(() => {
    // console.log(location.pathname);
    const item = arrContent.find((item) => location.pathname.includes(item.url));
    if (item) {
      return item.key;
    }
    return 0;
    // return item
  }, [location.pathname]);

  const selectedSub = useMemo(() => {
    // console.log(location.pathname);
    const item = arrContent.find((item) => location.pathname.includes(item.url));
    if (item && item.sub) {
      return item.sub;
    }
    return '0';
    // return item
  }, [location.pathname]);

  return (
    <div className="sidebar">
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
    </div>
  );
};

export default renderComponentWithConfig(Sidebar);
