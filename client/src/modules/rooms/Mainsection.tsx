import {
	EditFilled,
	EllipsisOutlined,
	ReloadOutlined,
	SearchOutlined,
	DollarOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Form, Input, Row, Select, Space, Tooltip } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { useGetAllRoomQuery } from "../../api/roomApi";
import SearchWrapper from "../../components/searchWrapper";
import { RootState, useAppSelector } from "../../redux/store";
import { RoomType } from "../../types/BuildingType";
import { formatMoney, getMonth, getYear } from "../../utils";
import ModalCustomer from "./modal/ModalCustomer";
import ModalEditRoom from "./modal/ModalEditRoom";
import PaymentComponent from "./Drawer/PaymentComponent";
import formatDate from "../../utils/formatDate";

interface DataType {
	key: string;
	name: String;
	status: Number; // default 0: empty, 1:hired 2//editing
	amountOfPeople: Number;
	payment: Number;
	area: Number;
	buildingId: String;
	electricNumber: String;
	motorbikeAmount: Number;
	domesticWaterFee: Number;
}

const Mainsection = () => {
	const [form] = Form.useForm();
	const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
	const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
	const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
	const [filter, setFilter] = useState({
		buildingId,
		priceFrom: "",
		priceTo: "",
		areaFrom: "",
		areaTo: "",
		status: "",
		floor: "",
	});
	const [isModalOpenAddCustomer, setIsModalOpenAddCustomer] = useState(false);
	const [roomSelect, setRoomSelect] = useState<RoomType | null>(null);
	const { data, isFetching, refetch } = useGetAllRoomQuery(filter, {
		skip: !filter,
		refetchOnMountOrArgChange: true,
	});
	const numberOfFloor = useAppSelector((state: RootState) => state.buildingId.numberOfFloors);
	const _handleFetchDefaultApi = () => {
		setFilter({
			buildingId,
			priceFrom: "",
			priceTo: "",
			areaFrom: "",
			areaTo: "",
			status: "",
			floor: "",
		});
	};
	const _handleSearch = (values: any) => {
		for (const key in values) {
			if (!values[key]) values[key] = "";
		}
		if (values.status == "-1")
			return setFilter({
				...filter,
				...values,
				status: "",
			});
		return setFilter({
			...filter,
			...values,
		});
	};

	const _handleOpenPayment = (item: RoomType) => {
		setRoomSelect(item);
		setIsOpenPayment(true);
	};

	const _handleClosePayment = () => {
		setRoomSelect(null);
		setIsOpenPayment(false);
	};

	const _handleRefetchFilter = () => {
		form.setFieldsValue({
			priceFrom: "",
			priceTo: "",
			areaFrom: "",
			areaTo: "",
			status: "",
			floor: "",
		});
		_handleFetchDefaultApi();
	};

	const _showModal = () => {
		setIsModalOpenAdd(true);
	};

	const _handleCancel = () => {
		setRoomSelect(null);
		setIsModalOpenAdd(false);
	};
	const _showModalCustomer = () => {
		setIsModalOpenAddCustomer(true);
	};

	const _handleCancelCustomer = () => {
		setRoomSelect(null);
		setIsModalOpenAddCustomer(false);
	};

	const isExpired = (date: any) => {
		return (
			getMonth(date) === new Date().getMonth() + 1 &&
			getYear(date) == new Date().getFullYear()
		);
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
			title: "Tên phòng",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Tầng",
			dataIndex: "floor",
			key: "floor",
		},
		{
			title: "Số người",
			dataIndex: "amountOfPeople",
			key: "amountOfPeople",
		},
		{
			title: "Diện tích (m2)",
			dataIndex: "area",
			key: "area",
		},
		{
			title: "Số lượng xe máy",
			dataIndex: "motorbikeAmount",
			key: "motorbikeAmount",
		},
		{
			title: "Giá phòng",
			dataIndex: "paymentDisplay",
			key: "paymentDisplay",
		},
		{
			title: "Ngày bắt đầu",
			dataIndex: "dateStart",
			key: "dateStart",
			render: (text) => <p>{formatDate(text, "dd/MM/yyyy")}</p>,
		},
		{
			title: "Ngày kết thúc",
			dataIndex: "dateEnd",
			key: "dateEnd",
			render: (text) => (
				<p style={{ color: isExpired(text) ? "red" : "" }}>
					{formatDate(text, "dd/MM/yyyy")}
				</p>
			),
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (text) =>
				text == 1 ? (
					<p style={{ color: "#1677ff" }}> Đang trống</p>
				) : (
					<p style={{ color: "red" }}>Đã thuê</p>
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

	const items = (item: any) => {
		return [
			{
				key: "1",
				icon: <DollarOutlined style={{ color: "#208B33" }} />,
				label: "Thanh toán",
				onClick: () => {
					_handleOpenPayment(item);
				},
			},
			{
				key: "2",
				icon: <UsergroupAddOutlined />,
				label: "Thêm thành viên",
				onClick: () => {
					_showModalCustomer();
					setRoomSelect(item);
				},
			},
			{
				key: "3",
				icon: <EditFilled />,
				label: "Sửa",
				onClick: () => {
					_showModal();
					setRoomSelect(item);
				},
			},
		];
	};

	const renderContent = () => {
		return data?.data?.map((item: RoomType, index: number) => {
			return {
				key: index + 1,
				...item,
				paymentDisplay: formatMoney(item.payment),
			};
		});
	};
	return (
		<>
			<SearchWrapper style={{ marginBottom: "20px" }}>
				<div className="room-search">
					<Form layout="vertical" form={form} onFinish={_handleSearch} preserve={false}>
						<Row gutter={10}>
							<Row className="room-search__group" gutter={10}>
								<div className="room-search__group--title">Giá phòng</div>
								<Col span={12}>
									<Form.Item label="Giá từ:" name="priceFrom">
										<Input type="number" />
									</Form.Item>
								</Col>

								<Col span={12}>
									<Form.Item label="Giá đến:" name="priceTo">
										<Input type="number" />
									</Form.Item>
								</Col>
							</Row>
							<Row className="room-search__group" gutter={10}>
								<div className="room-search__group--title">Diện tích</div>
								<Col span={12}>
									<Form.Item label="Diện tích từ:" name="areaFrom">
										<Input type="number" />
									</Form.Item>
								</Col>

								<Col span={12}>
									<Form.Item label="Diện tích đến:" name="areaTo">
										<Input type="number" />
									</Form.Item>
								</Col>
							</Row>
						</Row>
						<Row gutter={10}>
							<Col span={6}>
								<Form.Item
									label="Trạng thái"
									name="status"
									style={{ marginTop: "10px" }}
								>
									<Select>
										<Select.Option value={-1}>Tất cả</Select.Option>
										<Select.Option value={1}>Đang trống</Select.Option>
										<Select.Option value={2}>Đã thuê</Select.Option>
									</Select>
								</Form.Item>
							</Col>

							<Col span={6}>
								<Form.Item label="Tầng" name="floor" style={{ marginTop: "10px" }}>
									<Select>
										{Array(numberOfFloor)
											.fill((index: number) => (
												<Select.Option
													value={`Tầng ${index + 1}`}
													key={index}
												>{`Tầng ${index + 1}`}</Select.Option>
											))
											.map((item, index) => item(index))}
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
							Tìm kiếm
						</Button>
						<span
							style={{ cursor: "pointer", marginLeft: "10px" }}
							onClick={_handleRefetchFilter}
						>
							<Tooltip title="Tải lại">
								<ReloadOutlined style={{ color: "#d9d9d9" }} />
							</Tooltip>
						</span>
					</Form>
				</div>
			</SearchWrapper>
			<Table
				columns={columns}
				dataSource={renderContent()}
				loading={isFetching}
				bordered
				rowClassName={(record, index) =>
					index % 2 === 0 ? "table-row-light" : "table-row-dark"
				}
				// scroll={{ y: 395 }}
			/>
			<ModalEditRoom
				isModalOpen={isModalOpenAdd}
				room={roomSelect}
				handleCancel={_handleCancel}
			/>
			<ModalCustomer
				refetch={refetch}
				isModalOpen={isModalOpenAddCustomer}
				handleCancel={_handleCancelCustomer}
				room={roomSelect}
				fetchApi={_handleFetchDefaultApi}
			/>
			<PaymentComponent
				open={isOpenPayment}
				onClose={_handleClosePayment}
				room={roomSelect}
			/>
		</>
	);
};

export default Mainsection;
