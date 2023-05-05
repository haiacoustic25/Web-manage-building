import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { useGetAllHistoryQuery } from "../../api/historyApt";
import { RootState, useAppSelector } from "../../redux/store";
import formatDate from "../../utils/formatDate";

interface DataType {
	key: string;
	customerName: String;
	title: String; // default 0: empty, 1:hired 2//editing
	createAt: any;
	content: any;
}

const Mainsection = () => {
	const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
	const [filter, setFilter] = useState({
		buildingId,
		name: "",
		pageIndex: 1,
		pageSize: 10,
	});
	const { data, isFetching } = useGetAllHistoryQuery(filter, {
		skip: !filter,
		refetchOnMountOrArgChange: true,
	});
	const timeOut: any = useRef();

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (timeOut.current) clearTimeout(timeOut.current);
		timeOut.current = setTimeout(() => {
			setFilter({ ...filter, name: e.target.value });
		}, 1000);
	};

	const columns: ColumnsType<DataType> = [
		Table.EXPAND_COLUMN,
		{
			title: "Tên người nhận",
			dataIndex: "customerName",
			key: "customerName",
		},
		{
			title: "Tiêu đề",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Ngày gửi",
			dataIndex: "createAt",
			key: "createAt",
			render: (text) => <p>{formatDate(text, "dd/MM/yyyy")}</p>,
		},
	];
	const handleChangePage = (page: any) => {
		setFilter({ ...filter, pageIndex: page });
	};
	return (
		<>
			<Input
				style={{ marginBottom: "10px", width: "20%" }}
				prefix={<SearchOutlined />}
				onChange={onSearch}
			/>
			<Table
				columns={columns}
				dataSource={data?.data}
				loading={isFetching}
				bordered
				expandable={{
					expandedRowRender: (record) => (
						<p style={{ margin: 0 }}>
							<b>Nội dung:</b>
							{record.content}
						</p>
					),
				}}
				pagination={{
					position: ["bottomRight"],
					pageSize: 10,
					simple: true,
					onChange: handleChangePage,
					total: data?.totalRow,
					showTotal: (total, range) => `${range[0]} - ${range[1]} trong số ${total}`,
				}}
			/>
		</>
	);
};

export default Mainsection;
