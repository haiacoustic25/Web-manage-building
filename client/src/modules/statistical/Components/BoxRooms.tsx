import React from "react";
import { Link } from "react-router-dom";
import { RootState, useAppSelector } from "../../../redux/store";
import { useGetStatisticalRoomQuery } from "../../../api/statisticalApi";
import Skeleton from "react-loading-skeleton";

const BoxRooms = () => {
	const buildingId = useAppSelector((state: RootState) => state.buildingId.buildingId);
	const { data, isFetching } = useGetStatisticalRoomQuery({ buildingId });
	const renderContent = () => {
		if (isFetching) return <Skeleton height="50px" />;
		return (
			<div className="flex">
				<div className="number">{data?.data.totalRoom}</div>
				<ul className="list-statistical">
					<li>
						<div className="item">
							<div className="text">Số phòng còn trống</div>
							<div className="number-item">
								<p>{data?.data.totalRoomEmpty}</p>
								<Link to="/room">Chi tiết</Link>
							</div>
						</div>
					</li>
					<li>
						<div className="item">
							<div className="text">Số phòng đã thuê</div>
							<div className="number-item">
								<p>{data?.data.totalRoomHired}</p>
								<Link to="/room">Chi tiết</Link>
							</div>
						</div>
					</li>
				</ul>
			</div>
		);
	};
	return renderContent();
};

export default BoxRooms;
