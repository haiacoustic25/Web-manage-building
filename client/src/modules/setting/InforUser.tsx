import { SaveOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import { AvatarPicker } from "../../components/AvatarPicker/AvatarPicker";
import SelectAddress from "../../components/selectAddress";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { useUpdateUserMutation } from "../../api/authApi";
import dayjs from "dayjs";
import moment from "dayjs";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/reducer/authReducer";

const InforUser = () => {
	const [form] = Form.useForm();
	const user = useAppSelector((state: RootState) => state.dataUser.user);
	const dispatch = useAppDispatch();
	console.log({ user });
	const [handleUpdate, resultUpdate] = useUpdateUserMutation();
	const onChangePickAvatar = (value: any) => {
		form.setFieldsValue({ file: value?.file });
	};
	useEffect(() => {
		form.setFieldsValue({
			...user,
			dateOfBirth: user?.dateOfBirth ? moment(user?.dateOfBirth) : "",
			dateRange: user?.dateRange ? moment(user?.dateRange) : "",
		});
	}, [user]);

	const onFinish = (data: any) => {
		const formData = new FormData();
		for (const key in data) {
			if (
				data[key] !== undefined &&
				data[key] !== null &&
				key != "dateOfBirth" &&
				key != "dateRange"
			) {
				formData.append(key, data[key]);
			}
			if (key == "dateOfBirth" || key == "dateRange") {
				const date = dayjs(data[key]).format("YYYY-MM-DD");
				formData.append(key, date);
			}
		}
		formData.append("id", `${user?.id}`);
		handleUpdate(formData);
		console.log({ ...user, ...data });
		dispatch(
			updateUser({
				...user,
				...data,
				dateOfBirth: dayjs(data.dateOfBirth).format("YYYY-MM-DD"),
				dateRange: dayjs(data.dateRange).format("YYYY-MM-DD"),
			}),
		);
	};

	useEffect(() => {
		if (resultUpdate.isError) toast.error("Cập nhật thất bại");
		if (resultUpdate.isSuccess) toast.success("Cập nhật thành công");
	}, [resultUpdate]);
	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ style: { width: 200 } }}
			// labelCol={{ span: 4 }}
			// wrapperCol={{ span: 16 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			// onFinishFailed={onFinishFailed}
			autoComplete="off"
			style={{ background: "#f7f7f7", padding: "10px", height: "calc(100vh - 160px)" }}
		>
			<Form.Item label="Họ và tên" name="name" labelAlign="left">
				<Input />
			</Form.Item>

			<Row gutter={16}>
				<Col span={8}>
					<Form.Item
						label="CMND/CCCD số"
						name="citizenIdentificationNumber"
						labelAlign="left"
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Ngày cấp" name="dateRange" labelAlign="left">
						<DatePicker />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Nơi cấp" name="issuedBy" labelAlign="left">
						<Input />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item label="Điện thoại" name="phone" labelAlign="left">
						<Input />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Ngày sinh" name="dateOfBirth" labelAlign="left">
						<DatePicker />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item label="Email" name="email" labelAlign="left">
						<Input />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label="Mật khẩu email" name="password_email" labelAlign="left">
						<Input />
					</Form.Item>
				</Col>
			</Row>
			<Form.Item label="Địa chỉ" name="address" labelAlign="left">
				<Input />
			</Form.Item>
			<SelectAddress
				mode="filter"
				positionLabel="left"
				cityProps={user?.city}
				districtProps={user?.district}
				wardProps={user?.ward}
			/>
			<Form.Item label="Địa chỉ thường trú" name="permanentAddress" labelAlign="left">
				<Input />
			</Form.Item>
			<Form.Item label="Ảnh đại diện" name="file" labelAlign="left">
				<AvatarPicker
					value1={user?.avatar}
					width={150}
					type="circle"
					isImgDefault={true}
					onChangePickAvatar={onChangePickAvatar}
				/>
			</Form.Item>
			<Form.Item style={{ marginLeft: "200px", marginTop: "10px" }}>
				<Button type="primary" htmlType="submit" size="middle" icon={<SaveOutlined />}>
					Lưu
				</Button>
			</Form.Item>
		</Form>
	);
};

export default InforUser;
