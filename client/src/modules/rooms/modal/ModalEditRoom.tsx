import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useEditRoomMutation } from "../../../api/roomApi";
import { RootState, useAppSelector } from "../../../redux/store";
import { FurnitureArr } from "../../../constants/Furniture";
import moment from "dayjs";
import dayjs from "dayjs";

type Props = {
	isModalOpen: boolean;
	room: any;
	// handleOk: () => void;
	handleCancel: () => void;
};

const ModalEditRoom = ({ isModalOpen, handleCancel, room }: Props) => {
	const [form] = Form.useForm();
	const [handleEdit, resultEdit] = useEditRoomMutation();
	const numberOfFloor = useAppSelector((state: RootState) => state.buildingId.numberOfFloors);
	const onFinish = (value: any) => {
		handleEdit({
			id: room.id,
			...value,
			limitPeople: Number(value.limitPeople),
			area: Number(value.area),
			motorbikeAmount: Number(value.motorbikeAmount),
			payment: Number(value.payment),
			environmentFee: Number(value.environmentFee),
			internetFee: Number(value.internetFee),
			domesticWaterFee: Number(value.domesticWaterFee),
			electricFee: Number(value.electricFee),
			dateStart: room?.amountOfPeople ? dayjs(value.dateStart).format("YYYY-MM-DD") : "",
			dateEnd: room?.amountOfPeople ? dayjs(value.dateEnd).format("YYYY-MM-DD") : "",
			// furniture: JSON.stringify(value.furniture),
		});
	};
	useEffect(() => {
		if (resultEdit.isSuccess) {
			handleCancel();
			toast.success("Sửa thành công!");
		}
		if (resultEdit.isError) {
			toast.error("Sửa thất bại!");
		}
	}, [resultEdit]);
	useEffect(() => {
		if (room) {
			form.setFieldsValue({
				...room,
				dateStart: moment(room.dateStart || new Date()),
				dateEnd: moment(room.dateEnd || new Date()),
			});
		}
	}, [room]);
	return (
		<Modal
			title="Sửa thông tin phòng"
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
				style={{ maxWidth: 600 }}
			>
				<div style={{ padding: "10px 0" }}>
					<span style={{ marginRight: "30px" }}>Tên phòng:</span>
					<span style={{ fontSize: "16px", fontWeight: "700" }}>{room?.name}</span>
				</div>

				<div className="mc__container">
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
					<Form.Item
						label="Giới hạn người ở"
						name="limitPeople"
						rules={[{ required: true, message: "Không được để trống" }]}
						style={{ marginBottom: "12px" }}
					>
						<Input type="number" />
					</Form.Item>
					{room?.amountOfPeople ? (
						<>
							<Form.Item
								label="Ngày bắt đầu hợp đồng"
								name="dateStart"
								rules={[{ required: true, message: "Không được để trống" }]}
								style={{ marginBottom: "12px" }}
							>
								<DatePicker placeholder="Ngày bắt đầu" />
							</Form.Item>
							<Form.Item
								label="Ngày kết thúc hợp đồng"
								name="dateEnd"
								rules={[{ required: true, message: "Không được để trống" }]}
								style={{ marginBottom: "12px" }}
							>
								<DatePicker placeholder="Ngày kết thúc" />
							</Form.Item>
						</>
					) : (
						""
					)}
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

export default ModalEditRoom;
