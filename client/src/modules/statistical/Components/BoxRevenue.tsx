import { DatePicker, DatePickerProps } from "antd";
import {
	CategoryScale,
	Chart as ChartJS,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useLazyGetStatisticalRevenueQuery } from "../../../api/statisticalApi";
import { RootState, useAppSelector } from "../../../redux/store";

import { RangePickerProps } from "antd/es/date-picker";
import Skeleton from "react-loading-skeleton";
import formatDate from "../../../utils/formatDate";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const calculateMonth = (number: any) => {
	const date = new Date();
	date.setMonth(date.getMonth() - number);
	return date.toLocaleDateString();
};

const { RangePicker } = DatePicker;

const BoxRevenue = () => {
	const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
	const [isSelectDate, setIsSelectDate] = useState<boolean>(false);
	const [trigger, { data, isFetching }] = useLazyGetStatisticalRevenueQuery();

	useEffect(() => {
		trigger({
			buildingId,
			dateStart: formatDate(calculateMonth(6), "yyyy-mm-dd"),
			dateEnd: formatDate(new Date(), "yyyy-mm-dd"),
		});
	}, []);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Doanh thu theo tháng",
			},
		},
	};

	const labels = data?.data.map((item: any) => item.createdAt);
	// console.log(data?.data, labels);
	const data1 = {
		labels,
		datasets: [
			{
				label: "Doanh thu",
				data: data?.data.map((item: any) => item.totalPayment),
				borderColor: "#2EA2C7",
				backgroundColor: "#2EA2C7",
			},
		],
	};

	const onChange = (
		value: DatePickerProps["value"] | RangePickerProps["value"],
		dateString: [string, string] | string,
	) => {
		// console.log("Selected Time: ", value[0]);
		const dateStart = dateString[0];
		const dateEnd = dateString[1];
		if (dateStart && dateEnd)
			return trigger({
				buildingId,
				dateStart: dateStart,
				dateEnd: dateEnd,
			});

		return trigger({
			buildingId,
			dateStart: formatDate(calculateMonth(6), "yyyy-mm-dd"),
			dateEnd: formatDate(new Date(), "yyyy-mm-dd"),
		});
	};
	const renderContent = () => {
		if (isFetching) return <Skeleton height="420px" />;
		return <Line options={options} data={data1} />;
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "end",
					gap: "10px",
					alignItems: "center",
				}}
			>
				<RangePicker onChange={onChange} picker="month" />
			</div>
			{renderContent()}
		</>
	);
};

export default BoxRevenue;
