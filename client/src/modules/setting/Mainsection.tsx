import { Tabs, TabsProps } from "antd";
import React from "react";
import InforUser from "./InforUser";
import ChangePassword from "./ChangePassword";

const Mainsection = () => {
	const onChange = (key: string) => {
		console.log(key);
	};
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: `Thông tin chủ trọ`,
			children: <InforUser />,
		},
		{
			key: "2",
			label: `Thay đổi mật khẩu`,
			children: <ChangePassword />,
		},
	];
	return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default Mainsection;
