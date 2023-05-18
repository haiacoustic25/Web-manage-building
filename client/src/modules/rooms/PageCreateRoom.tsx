import React, { useEffect } from "react";
import LayoutWrapper from "../../components/layoutWrapper";
import { Button, Form, Input, Select } from "antd";
import { RootState, useAppSelector } from "../../redux/store";
import { useCreateRoomMutation } from "../../api/roomApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const PageCreateRoom = () => {
	const [form] = Form.useForm();
	const navigation = useNavigate();
	const numberOfFloor = useAppSelector((state: RootState) => state.buildingId.numberOfFloors);
	const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
	const [handleCreate, resultCreate] = useCreateRoomMutation();
	const onFinish = (value: any) => {
		handleCreate({
			buildingId,
			...value,
			area: Number(value.area),
			motorbikeAmount: Number(value.motorbikeAmount),
			payment: Number(value.payment),
			environmentFee: Number(value.environmentFee),
			internetFee: Number(value.internetFee),
			domesticWaterFee: Number(value.domesticWaterFee),
			electricFee: Number(value.electricFee),
		});
	};
	useEffect(() => {
		if (resultCreate.isSuccess) {
			toast.success("Sửa thành công!");
			navigation(-1);
		}
		if (resultCreate.isError) {
			toast.error("Sửa thất bại!");
		}
	}, [resultCreate]);

	return (
		<LayoutWrapper>
			<h2 style={{ marginBottom: "20px" }}>Thêm phòng trọ</h2>
			<Form
				layout="horizontal"
				form={form}
				preserve={false}
				labelCol={{ span: 10 }}
				labelAlign="left"
				onFinish={onFinish}
				style={{ maxWidth: 600 }}
			>
				<Form.Item
					label="Tên phòng"
					name="name"
					rules={[{ required: true, message: "Không được để trống" }]}
					style={{ marginBottom: "12px" }}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Diện tích (m2)"
					name="area"
					rules={[{ required: true, message: "Không được để trống" }]}
					style={{ marginBottom: "12px" }}
				>
					<Input type="number" />
				</Form.Item>
				<Form.Item
					label="Tầng"
					name="floor"
					rules={[{ required: true, message: "Không được để trống" }]}
					style={{ marginBottom: "12px" }}
				>
					<Select>
						{Array(numberOfFloor)
							.fill((index: number) => (
								<Select.Option value={`Tầng ${index + 1}`} key={index}>{`Tầng ${
									index + 1
								}`}</Select.Option>
							))
							.map((item, index) => item(index))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Giá tiền phòng"
					name="payment"
					style={{ marginBottom: "12px" }}
					rules={[{ required: true, message: "Không được để trống" }]}
				>
					<Input type="number" />
				</Form.Item>
				<Form.Item
					label="Tiền điện ( Trên 1 số )"
					name="electricFee"
					rules={[{ required: true, message: "Không được để trống" }]}
					style={{ marginBottom: "12px" }}
				>
					<Input type="number" />
				</Form.Item>
				<Form.Item
					label="Tiền nước ( Trên 1 m khối )"
					name="domesticWaterFee"
					rules={[{ required: true, message: "Không được để trống" }]}
					style={{ marginBottom: "12px" }}
				>
					<Input type="number" />
				</Form.Item>
				<Form.Item
					label="Tiền mạng"
					name="internetFee"
					rules={[{ required: true, message: "Không được để trống" }]}
					style={{ marginBottom: "12px" }}
				>
					<Input type="number" />
				</Form.Item>
				<Form.Item
					label="Tiền vệ sinh"
					name="environmentFee"
					rules={[{ required: true, message: "Không được để trống" }]}
					style={{ marginBottom: "12px" }}
				>
					<Input type="number" />
				</Form.Item>
				<Form.Item
					label="Số lượng xe máy"
					name="motorbikeAmount"
					rules={[{ required: true, message: "Không được để trống" }]}
					style={{ marginBottom: "12px" }}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Lưu
					</Button>
				</Form.Item>
			</Form>
		</LayoutWrapper>
	);
};
