import {
	DeleteOutlined,
	EditFilled,
	PlusCircleOutlined,
	RollbackOutlined,
} from "@ant-design/icons";
import { Button, Modal, Select, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import LayoutWrapper from "../../components/layoutWrapper";
import { formatMoney } from "../../utils";
import formatDate from "../../utils/formatDate";
import { useNavigate, useParams } from "react-router-dom";
import {
	useEditDebtMutation,
	useFindDebtByRoomIdQuery,
	useRemoveDebtMutation,
} from "../../api/debtApi";
import "../../assets/styles/customer.scss";
import { useEffect, useState } from "react";
import ModalAddDebt from "./Modal/ModalAddDebt";
import { toast } from "react-toastify";
import { RootState, useAppSelector } from "../../redux/store";
import { useGetAllRoomQuery } from "../../api/roomApi";
import ModalAddDebtPage from "./Modal/ModalAddDebtPage";
interface DataType {
	id: string;
	key: string;
	content: string;
	money: String;
	status: Number;
	createAt: Number;
}

export const PageDetailDebt = () => {
	const { roomId } = useParams();
	const { confirm } = Modal;
	const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
	const { data: dataRoom } = useGetAllRoomQuery({
		buildingId,
		priceFrom: "",
		priceTo: "",
		areaFrom: "",
		areaTo: "",
		status: "",
	});
	const navigation = useNavigate();
	const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
	const { data, isFetching } = useFindDebtByRoomIdQuery(roomId);
	const [handleDelete, resultDelete] = useRemoveDebtMutation();
	const [handleEdit, resultEdit] = useEditDebtMutation();
	const [debtSelect, setDebtSelect] = useState<any>();
	const _showModal = () => {
		setIsModalOpenAdd(true);
	};

	const _handleCancel = () => {
		setDebtSelect(null);
		setIsModalOpenAdd(false);
	};

	useEffect(() => {
		if (resultDelete.isSuccess) toast.success("Xóa thành công");
		if (resultDelete.isError) toast.error("Xóa thất bại");
		if (resultEdit.isSuccess) toast.success("Sửa thành công");
		if (resultEdit.isError) toast.error("Sửa thất bại");
	}, [resultDelete, resultEdit]);

	const handleChange = (value: any, item: any) => {
		handleEdit({ ...item, status: value });
	};
	const columns: ColumnsType<DataType> = [
		{
			title: "Nội dung",
			dataIndex: "content",
			key: "content",
		},
		{
			title: "Số tiền",
			dataIndex: "money",
			key: "money",
			render: (text) => <p>{formatMoney(text)}</p>,
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (text, record) => (
				<Select
					defaultValue={text}
					style={{ width: "100%" }}
					onChange={(value) => handleChange(value, record)}
					options={[
						{ value: 1, label: "Chưa thanh toán" },
						{ value: 2, label: "Đã thanh toán" },
					]}
				/>
			),
		},
		{
			title: "Ngày ghi",
			dataIndex: "createAt",
			key: "createAt",
			render: (text) => formatDate(text, "dd/MM/yyyy"),
		},

		{
			title: "Hành động",
			key: "action",
			align: "left",
			width: "50px",

			render: (_, record) => (
				<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
					<Tooltip title="Sửa">
						<Button
							shape="circle"
							icon={<EditFilled />}
							onClick={() => {
								setDebtSelect(record);
								_showModal();
							}}
						/>
					</Tooltip>
					<Tooltip title="Xóa">
						<Button
							shape="circle"
							icon={<DeleteOutlined style={{ color: "red" }} />}
							onClick={() => showConfirm(record)}
						/>
					</Tooltip>
				</div>
			),
		},
	];

	const showConfirm = (item: any) => {
		confirm({
			title: "Xóa",
			icon: <DeleteOutlined style={{ color: "red" }} />,
			content: "Bạn có muốn xóa không?",
			okText: "Đồng ý",
			// confirmLoading:isLoading,
			cancelText: "Hủy",
			onOk() {
				handleDelete({ id: item.id });
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	return (
		<LayoutWrapper>
			<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
				<RollbackOutlined style={{ cursor: "pointer" }} onClick={() => navigation(-1)} />
				<h2>Xem chi tiết công nợ</h2>
			</div>
			<div className="customer-content">
				<Button
					type="primary"
					icon={<PlusCircleOutlined />}
					className="customer-content__add"
					onClick={_showModal}
				>
					Thêm
				</Button>
				<Table
					columns={columns}
					dataSource={data?.data}
					loading={isFetching}
					bordered
					rowClassName={(record, index) =>
						index % 2 === 0 ? "table-row-light" : "table-row-dark"
					}
					// scroll={{ y: 395 }}
				/>
			</div>
			<ModalAddDebt
				debtSelect={debtSelect}
				isModalOpen={isModalOpenAdd}
				handleCancel={_handleCancel}
			/>
		</LayoutWrapper>
	);
};
