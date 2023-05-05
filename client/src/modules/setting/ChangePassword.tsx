import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useChangePassMutation } from "../../api/authApi";
import { RootState, useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ChangePassword = () => {
	const [form] = Form.useForm();
	const user = useAppSelector((state: RootState) => state.dataUser.user);
	const [handleChangePass, resultChangePass] = useChangePassMutation();
	const onFinish = (data: any) => {
		handleChangePass({ id: user?.id, ...data });
	};
	useEffect(() => {
		if (resultChangePass.isError) toast.error("Cập nhật thất bại");
		if (resultChangePass.isSuccess && resultChangePass.data.success)
			toast.success("Cập nhật thành công");
		if (resultChangePass.isSuccess && !resultChangePass.data.success)
			toast.error("Mật khẩu cũ không đúng");

		console.log({ resultChangePass });
	}, [resultChangePass]);
	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ style: { width: 200 } }}
			initialValues={{ remember: true }}
			autoComplete="off"
			onFinish={onFinish}
			style={{ background: "#f7f7f7", padding: "10px", height: "calc(100vh - 160px)" }}
		>
			<Form.Item label="Mật khẩu cũ" name="prevPassword" labelAlign="left">
				<Input.Password />
			</Form.Item>
			<Form.Item label="Mật khẩu mới" name="newPassword" labelAlign="left">
				<Input.Password />
			</Form.Item>

			<Form.Item style={{ marginLeft: "200px", marginTop: "10px" }}>
				<Button type="primary" htmlType="submit" size="middle" icon={<SaveOutlined />}>
					Lưu
				</Button>
			</Form.Item>
		</Form>
	);
};

export default ChangePassword;
