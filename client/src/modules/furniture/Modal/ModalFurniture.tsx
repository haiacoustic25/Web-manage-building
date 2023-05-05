import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { AvatarPicker } from "../../../components/AvatarPicker/AvatarPicker";
import { useAddFurnitureMutation, useEditFurnitureMutation } from "../../../api/furnitureApi";
import { toast } from "react-toastify";
type Props = {
	isModalOpen: boolean;
	furnitureSelect?: any;
	listRoom: any;
	//   fetchApi: () => void;
	handleCancel: () => void;
	//   room: any;
};
const ModalFurniture = ({ isModalOpen, handleCancel, listRoom, furnitureSelect }: Props) => {
	const [form] = Form.useForm();
	const [handleAdd, resultAdd] = useAddFurnitureMutation();
	const [handleUpdate, resultUpdate] = useEditFurnitureMutation();
	const onFinish = (data: any) => {
		const formData = new FormData();
		for (const key in data) {
			if (data[key] !== undefined && data[key] !== null) {
				formData.append(key, data[key]);
			}
		}
		if (furnitureSelect) {
			formData.append("id", `${furnitureSelect.id}`);
			return handleUpdate(formData);
		}
		formData.append("status", "1");
		return handleAdd(formData);
	};
	const onChangePickAvatar = (value: any) => {
		form.setFieldsValue({ file: value?.file });
	};
	useEffect(() => {
		if (furnitureSelect) {
			form.setFieldsValue(furnitureSelect);
		}
	}, [furnitureSelect]);
	useEffect(() => {
		if (resultAdd.isError) toast.error("Thêm thất bại");
		if (resultAdd.isSuccess) {
			toast.success("Thêm thành công");
			handleCancel();
		}
		if (resultUpdate.isError) toast.error("Sửa thất bại");
		if (resultUpdate.isSuccess) {
			toast.success("Sửa thành công");
			handleCancel();
		}
	}, [resultAdd, resultUpdate]);
	return (
		<Modal
			title="Thêm nội thất"
			open={isModalOpen}
			onCancel={handleCancel}
			destroyOnClose={true}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				preserve={false}
				onFinish={onFinish}
				// style={{ maxWidth: 600 }}
			>
				<Form.Item
					//   label="Image"
					name="file"
					style={{ display: "flex", justifyContent: "center" }}
				>
					<AvatarPicker
						value1={furnitureSelect?.image}
						width={150}
						type="circle"
						isImgDefault={true}
						onChangePickAvatar={onChangePickAvatar}
					/>
				</Form.Item>
				<Form.Item
					label="Tên sản phẩm"
					name="name"
					rules={[{ required: true, message: "Không được để trống" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Số tiền"
					name="price"
					rules={[{ required: true, message: "Không được để trống" }]}
				>
					<Input type="number" />
				</Form.Item>
				{furnitureSelect && (
					<Form.Item
						label="Trạng thái"
						name="status"
						rules={[{ required: true, message: "Không được để trống" }]}
					>
						<Select
							style={{ width: "50%" }}
							// onChange={onGenderChange}
							// allowClear
						>
							<Select.Option value={1}>Đang sử dụng</Select.Option>
							<Select.Option value={2}>Đã thanh lý</Select.Option>
						</Select>
					</Form.Item>
				)}
				<Form.Item
					label="Phòng"
					name="roomId"
					rules={[{ required: true, message: "Không được để trống" }]}
				>
					<Select
						style={{ width: "50%" }}
						// onChange={onGenderChange}
						// allowClear
					>
						{listRoom?.data.map((_: any) => (
							<Select.Option value={_.id}>{_.name}</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item style={{ justifyContent: "end", display: "flex" }}>
					<Button style={{ marginRight: "10px" }} onClick={handleCancel}>
						Hủy
					</Button>
					<Button type="primary" htmlType="submit">
						Lưu
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalFurniture;
