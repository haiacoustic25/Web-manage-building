import {
	EditFilled,
	EllipsisOutlined,
	PlusCircleOutlined,
	ReloadOutlined,
	RollbackOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Form, Input, Row, Select, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useEditBookingMutation, useGetAllBookingQuery } from "../../api/bookingApi";
import { useGetAllRoomQuery } from "../../api/roomApi";
import SearchWrapper from "../../components/searchWrapper";
import { RootState, useAppSelector } from "../../redux/store";
import ModalAdd from "./Modal/ModalAdd";
import { BookingType } from "../../types/BookingType";
import formatDate from "../../utils/formatDate";
import { formatMoney } from "../../utils";
import { toast } from "react-toastify";

interface DataType {
	key: string;
	roomName: string;
	price: String;
	status: Number; // default 0: empty, 1:hired 2//editing
	createdAt: any;
	customerName: String;
}

const Mainsection = () => {
	const [form] = Form.useForm();
	const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
	const [bookingSelect, setBookingSelect] = useState<BookingType | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [handleEdit, resultEdit] = useEditBookingMutation();
	const { data: dataRoom } = useGetAllRoomQuery({
		buildingId,
		priceFrom: "",
		priceTo: "",
		areaFrom: "",
		areaTo: "",
		status: "",
	});
	const [filter, setFilter] = useState({
		status: "",
		roomId: "",
		pageIndex: 1,
		pageSize: 10,
	});
	const { data, isFetching } = useGetAllBookingQuery(filter, {
		skip: !filter,
		refetchOnMountOrArgChange: true,
		// pollingInterval: 1000,
	});
	const _showModalBooking = () => {
		setIsModalOpen(true);
	};

	const _handleCancelBooking = () => {
		// setRoomSelect(null);
		setIsModalOpen(false);
		if (bookingSelect) setBookingSelect(null);
	};
	const _handleSearch = (values: any) => {
		setFilter({ ...filter, ...values, pageIndex: 1 });
	};
	const _handleRefreshSearch = (values: any) => {
		setFilter({ status: "", roomId: "", pageIndex: 1, pageSize: 10 });
	};
	const columns: ColumnsType<DataType> = [
		{
			title: "STT",
			dataIndex: "key",
			key: "key",
			width: "70px",
			// render: (text) => <a>{text}</a>,
		},
		{
			title: "Phòng",
			dataIndex: "roomName",
			key: "roomName",
		},
		{
			title: "Người cọc",
			dataIndex: "customerName",
			key: "customerName",
		},
		{
			title: "Số tiền",
			dataIndex: "price",
			key: "price",
			render: (text) => <p>{formatMoney(text)}</p>,
		},
		{
			title: "Ngày cọc",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (text) => <p>{formatDate(text, "dd/MM/yyyy")}</p>,
		},

		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (text) =>
				text == 1 ? (
					<p style={{ color: "#1677ff" }}>Đã cọc</p>
				) : (
					<p style={{ color: "red" }}>Đã hết hợp đồng</p>
				),
		},
		{
			// title: 'Hành động',
			key: "action",
			align: "right",
			width: "50px",
			render: (_, record) => (
				<Space size="middle">
					<Dropdown menu={{ items: items(record) }} placement="bottomLeft" arrow>
						<Button shape="circle" icon={<EllipsisOutlined />} />
					</Dropdown>
				</Space>
			),
		},
	];
	const _handleRefundMoney = (item: any) => {
		handleEdit({ ...item, status: 2 });
	};
	const handleChangePage = (page: any) => {
		setFilter({ ...filter, pageIndex: page });
	};
	useEffect(() => {
		if (resultEdit.isError) toast.error("Hoàn tiền thất bại");
		if (resultEdit.isSuccess) {
			toast.success("Hoàn tiền thành công");
		}
	}, [resultEdit]);
	const items = (item: any) => {
		return [
			{
				key: "1",
				icon: <RollbackOutlined style={{ color: "#208B33" }} />,
				label: "Hoàn tiền",
				onClick: () => {
					// _handleOpenPayment(item);
					_handleRefundMoney(item);
				},
			},

			{
				key: "2",
				icon: <EditFilled />,
				label: "Sửa",
				onClick: () => {
					_showModalBooking();
					setBookingSelect(item);
					// setRoomSelect(item);
				},
			},
		];
	};
	const renderContent = () => {
		return data?.data?.map((item: any, index: number) => {
			return {
				key: (filter.pageIndex - 1) * filter.pageSize + index + 1,
				...item,
			};
		});
	};
	return (
		<>
			<SearchWrapper style={{ marginBottom: "20px" }}>
				<Form layout="vertical" form={form} onFinish={_handleSearch} preserve={false}>
					<Row gutter={10}>
						<Col span={6}>
							<Form.Item label="Chọn phòng" name="roomId">
								<Select style={{ width: "100%" }}>
									<Select.Option value={-1}>Tất cả</Select.Option>
									{dataRoom?.data.map((_: any) => (
										<Select.Option value={_.id}>{_.name}</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item label="Trạng thái" name="status">
								<Select style={{ width: "100%" }}>
									<Select.Option value={-1}>Tất cả</Select.Option>
									<Select.Option value={1}>Đã nộp</Select.Option>
									<Select.Option value={2}>Đã hết hợp đồng</Select.Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
						Tìm kiếm
					</Button>
					<span
						style={{ cursor: "pointer", marginLeft: "10px" }}
						onClick={_handleRefreshSearch}
					>
						<Tooltip title="Tải lại">
							<ReloadOutlined style={{ color: "#d9d9d9" }} />
						</Tooltip>
					</span>
				</Form>
			</SearchWrapper>
			<div className="customer-content">
				<Button
					type="primary"
					icon={<PlusCircleOutlined />}
					className="customer-content__add"
					onClick={_showModalBooking}
				>
					Thêm
				</Button>
				<Table
					columns={columns}
					dataSource={renderContent()}
					loading={isFetching}
					bordered
					pagination={{
						position: ["bottomRight"],
						pageSize: 10,
						simple: true,
						onChange: handleChangePage,
						total: data?.totalRow,
						showTotal: (total, range) => `${range[0]} - ${range[1]} trong số ${total}`,
					}}
					// scroll={{ y: 395 }}
				/>
			</div>
			<ModalAdd
				listRoom={dataRoom}
				isModalOpen={isModalOpen}
				handleCancel={_handleCancelBooking}
				bookingSelect={bookingSelect}
			/>
		</>
	);
};

export default Mainsection;
