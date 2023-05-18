import { Button, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useAddDebtMutation, useEditDebtMutation } from "../../../api/debtApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
	isModalOpen: boolean;
	debtSelect: any;
	handleCancel: () => void;
};

const ModalAddDebt = ({ isModalOpen, handleCancel, debtSelect }: Props) => {
	const [form] = Form.useForm();
	const { roomId } = useParams();
	console.log(debtSelect);
	const [handleAdd, resultAdd] = useAddDebtMutation();
	const [handleEdit, resultEdit] = useEditDebtMutation();
	const onFinish = (data: any) => {
		if (debtSelect) return handleEdit({ ...debtSelect, ...data, money: +data.money });
		return handleAdd({ roomId, ...data, money: +data.money });
	};
	useEffect(() => {
		form.setFieldsValue(debtSelect);
	}, [debtSelect]);
	useEffect(() => {
		if (resultAdd.isSuccess) {
			toast.success("Thêm thành công");
			handleCancel();
		}
		if (resultAdd.isError) toast.error("Thêm thất bại");
		if (resultEdit.isSuccess) {
			toast.success("Sửa thành công");
			handleCancel();
		}
		if (resultEdit.isError) toast.error("Sửa thất bại");
	}, [resultAdd, resultEdit]);
	return (
		<Modal
			title="Thêm công nợ"
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
					label="Nội dung"
					name="content"
					rules={[{ required: true, message: "Không được để trống" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Số tiền"
					name="money"
					rules={[{ required: true, message: "Không được để trống" }]}
				>
					<Input type="number" />
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

export default ModalAddDebt;
