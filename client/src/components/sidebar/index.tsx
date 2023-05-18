import {
	AccountBookOutlined,
	BarChartOutlined,
	DollarOutlined,
	HomeOutlined,
	MacCommandOutlined,
	UserOutlined,
	HistoryOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/sidebar.scss";
import { url } from "../../routes/listRouter";

type MenuItem = Required<MenuProps>["items"][number];
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
	type?: "group",
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
	getItem("Thống kê", "0", <BarChartOutlined />),
	getItem("Quản lý hóa đơn", "sub3", <AccountBookOutlined />, [getItem("Quản lý hóa đơn", "5")]),
	getItem("Quản lý phòng trọ", "sub1", <HomeOutlined />, [getItem("Quản lý phòng trọ", "1")]),
	getItem("Quản lý tiền cọc", "6", <DollarOutlined />),
	getItem("Quản lý công nợ", "10", <DollarOutlined />),
	getItem("Quản lý nội thất", "7", <MacCommandOutlined />),
	getItem("Lịch sử gửi Email", "8", <HistoryOutlined />),
	getItem("Quản lý người thuê", "sub2", <UserOutlined />, [
		getItem("Quản lý người đang thuê", "3"),
		getItem("Quản lý người đã hủy", "4"),
	]),
	getItem("Thiết lập", "9", <SettingOutlined />),
];

const arrContent: ArrContent[] = [
	{
		key: 0,
		url: url.statistical,
	},
	{
		key: 1,
		url: url.roomManager,
		sub: "sub1",
	},
	{
		key: 3,
		url: url.userManager,
		sub: "sub2",
	},
	{
		key: 4,
		url: url.userNonActiveManager,
		sub: "sub2",
	},
	{
		key: 5,
		url: url.reportManager,
		sub: "sub3",
	},
	{
		key: 6,
		url: url.bookingManager,
	},
	{
		key: 7,
		url: url.furnitureManager,
	},
	{
		key: 8,
		url: url.history,
	},
	{
		key: 9,
		url: url.setting,
	},
	{
		key: 10,
		url: url.debt,
	},
];

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(() => {
		const x = window.innerWidth;
		if (x < 1200) return true;
		return false;
	});
	const location = useLocation();
	const navigation = useNavigate();
	useEffect(() => {
		const changeSidebar = () => {
			const x = window.innerWidth;
			if (x < 1200) setCollapsed(true);
			else setCollapsed(false);
		};
		window.addEventListener("resize", changeSidebar, true);
		return window.removeEventListener("resize", changeSidebar);
	}, []);

	const handleNavigation = (value: any) => {
		const selectLink = arrContent.find((item) => item.key == value?.key);
		if (selectLink) {
			navigation(selectLink?.url);
		}
	};
	const selectedKey = useMemo(() => {
		// console.log(location.pathname);
		const item = arrContent.find(
			(item) => location.pathname == item.url || location.pathname.includes(`${item.url}/`),
		);
		if (item) {
			return item.key;
		}
		return 0;
		// return item
	}, [location.pathname]);

	const selectedSub = useMemo(() => {
		// console.log(location.pathname);
		const item = arrContent.find(
			(item) => location.pathname == item.url || location.pathname.includes(`${item.url}/`),
		);
		if (item && item.sub) {
			return item.sub;
		}
		return "0";
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

export default Sidebar;
