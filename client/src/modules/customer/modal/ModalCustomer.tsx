import { Button, Col, DatePicker, Form, Input, Modal, Radio, Row, Select } from "antd";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { AvatarPicker } from "../../../components/AvatarPicker/AvatarPicker";
import SelectAddress from "../../../components/selectAddress";
import { useAddCustomerMutation, useUpdateCustomerMutation } from "../../../api/customerApi";
import "../../../assets/styles/room.scss";
import { CustomerType } from "../../../types/CustomerType";
import { BASE_URL_AVT } from "../../../constants/config";
import moment from "dayjs";
import dayjs from "dayjs";
type Props = {
	isModalOpen: boolean;
	customerSelect: CustomerType | null;
	listRoom: any;
	//   fetchApi: () => void;
	handleCancel: () => void;
	//   room: any;
};

const ModalCustomer = ({ isModalOpen, handleCancel, listRoom, customerSelect }: Props) => {
	const [form] = Form.useForm();
	const [handleAdd, resultAdd] = useAddCustomerMutation();
	const [handleUpdate, resultUpdate] = useUpdateCustomerMutation();
	const { isSuccess, isLoading, isError } = resultAdd;
	const onFinish = (data: any) => {
		// if (!building) return handleAdd({ userId, ...value, amountRooms: Number(value.amountRooms) });
		// return handleEdit({ id: building.id, ...value });
		const formData = new FormData();
		for (const key in data) {
			if (data[key] !== undefined && data[key] !== null && key !== "dateStart") {
				formData.append(key, data[key]);
			}
		}
		const dateStart = dayjs(data.dateStart).format("YYYY-MM-DD");
		formData.append("dateStart", `${dateStart}`);
		if (customerSelect) {
			formData.append("id", `${customerSelect.id}`);
			return handleUpdate(formData);
		}

		formData.append("status", "1");
		return handleAdd(formData);
	};

	const onChangePickAvatar = (value: any) => {
		form.setFieldsValue({ file: value?.file });
	};

	useEffect(() => {
		if (customerSelect) {
			form.setFieldsValue({
				...customerSelect,
				dateStart: moment(customerSelect.dateOfEntry || new Date()),
			});
		}
	}, [customerSelect]);

	useEffect(() => {
		if (isError) toast.error("Thêm thất bại");
		if (isSuccess) {
			toast.success("Thêm thành công");
			handleCancel();
		}
		if (resultUpdate.isError) toast.error("Sửa thất bại");
		if (resultUpdate.isSuccess) {
			toast.success("Sửa thành công");
			handleCancel();
		}
	}, [resultAdd, resultUpdate]);
	// console.log(customerSelect?.avatar);
	return (
		<Modal
			title="Thêm người thuê"
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
				<div className="mc__container">
					<Row gutter={10}>
						<Col span={6}>
							<Form.Item label="Avatar" name="file">
								<AvatarPicker
									value1={customerSelect?.avatar}
									width={100}
									type="circle"
									isImgDefault={true}
									onChangePickAvatar={onChangePickAvatar}
								/>
							</Form.Item>
						</Col>
						<Col span={18}>
							<Row>
								<Col span={24}>
									<Form.Item
										label="Họ và tên"
										name="name"
										rules={[{ required: true, message: "Không được để trống" }]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={24}>
									<Form.Item
										label="Số điện thoại"
										name="phone"
										rules={[{ required: true, message: "Không được để trống" }]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
						</Col>
					</Row>
					<Form.Item
						label="Phòng"
						name="roomId"
						rules={[{ required: true, message: "Không được để trống" }]}
					>
						<Select
							style={{ width: "100%" }}
							// onChange={onGenderChange}
							// allowClear
						>
							{listRoom?.data.map((_: any) => (
								<Select.Option value={_.id}>{_.name}</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						label="email"
						name="email"
						rules={[{ required: true, message: "Không được để trống" }]}
					>
						<Input type="email" />
					</Form.Item>
					<Form.Item
						label="Số căn cước công dân"
						name="citizenIdentificationNumber"
						rules={[{ required: true, message: "Không được để trống" }]}
					>
						<Input />
					</Form.Item>
					<SelectAddress
						required={true}
						cityProps={customerSelect?.city}
						districtProps={customerSelect?.district}
						wardProps={customerSelect?.ward}
					/>
					<Row>
						{/* <Col span={12}>
                <Form.Item
                  label="Ngày sinh"
                  name="birthday"
                  rules={[{ required: true, message: 'Không được để trống' }]}
                >
                  <DatePicker />
                </Form.Item>
              </Col> */}
						<Col span={12}>
							<Form.Item
								label="Giới tính"
								name="gender"
								rules={[{ required: true, message: "Không được để trống" }]}
							>
								<Radio.Group>
									<Radio value={1}> Nữ </Radio>
									<Radio value={2}> Nam </Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item
						label="Ngày ở"
						name="dateStart"
						rules={[{ required: true, message: "Không được để trống" }]}
					>
						<DatePicker />
					</Form.Item>
				</div>

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

export default ModalCustomer;
