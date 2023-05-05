import {
	CategoryScale,
	Chart as ChartJS,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGetStatisticalRevenueQuery } from "../../../api/statisticalApi";
import { RootState, useAppSelector } from "../../../redux/store";
import { useCallback, useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const BoxRevenue = () => {
	const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
	const { data, isFetching } = useGetStatisticalRevenueQuery({ buildingId });

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
	console.log(data?.data, labels);
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
	return <Line options={options} data={data1} />;
};

export default BoxRevenue;
