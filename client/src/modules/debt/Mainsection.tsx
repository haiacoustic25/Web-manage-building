import { ExportOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useGetAllDebtQuery } from "../../api/debtApi";
import { RootState, useAppSelector } from "../../redux/store";
import { formatMoney } from "../../utils";
import { redirect, useNavigate } from "react-router-dom";
import ModalAddDebtPage from "./Modal/ModalAddDebtPage";
import { useGetAllRoomQuery } from "../../api/roomApi";
import { useState } from "react";

interface DataType {
	key: string;
	roomId: string;
	roomName: String;
	totalPayment: Number;
	totalPaymentPaid: Number;
}

const Mainsection = () => {
	const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
	const { data, isFetching } = useGetAllDebtQuery({ buildingId });
	const { data: dataRoom } = useGetAllRoomQuery({
		buildingId,
		priceFrom: "",
		priceTo: "",
		areaFrom: "",
		areaTo: "",
		status: "",
	});
	const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
	const navigation = useNavigate();
	// console.log({ data });
	const _showModal = () => {
		setIsModalOpenAdd(true);
	};

	const _handleCancel = () => {
		setIsModalOpenAdd(false);
	};
	const columns: ColumnsType<DataType> = [
		{
			title: "Tên phòng",
			dataIndex: "roomName",
			key: "roomName",
		},
		{
			title: "Số tiền đã trả",
			dataIndex: "totalPaymentPaid",
			key: "totalPaymentPaid",
			render: (text) => <p>{formatMoney(text)}</p>,
		},
		{
			title: "Số tiền còn thiếu",
			dataIndex: "totalPayment",
			key: "totalPayment",
			render: (text, record) => (
				<p>{formatMoney(+record.totalPayment - +record.totalPaymentPaid)}</p>
			),
		},

		{
			// title: 'Hành động',
			key: "action",
			align: "right",
			width: "50px",

			render: (_, record) => (
				<div
					style={{ cursor: "pointer" }}
					onClick={() => navigation(`/debt/${record.roomId}`)}
				>
					<Tooltip title="Xem chi tiêt">
						<ExportOutlined />
					</Tooltip>
				</div>
			),
		},
	];

	return (
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
			<ModalAddDebtPage
				listRoom={dataRoom}
				isModalOpen={isModalOpenAdd}
				handleCancel={_handleCancel}
			/>
		</div>
	);
};

export default Mainsection;
