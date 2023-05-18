import { EditFilled } from "@ant-design/icons";
import "../../assets/styles/statistical.scss";
import BoxCustomer from "./Components/BoxCustomer";
import BoxGender from "./Components/BoxGender";
import BoxPayment from "./Components/BoxPayment";
import BoxRevenue from "./Components/BoxRevenue";
import BoxRooms from "./Components/BoxRooms";
import BoxStatistical from "./Components/BoxStatistical";
const Mainsection = () => {
	return (
		<>
			<div className="main-statistical__top">
				<BoxStatistical
					title="Thống kê người thuê"
					width="55%"
					icon={<EditFilled style={{ color: "#fff", fontSize: "16px" }} />}
				>
					<BoxCustomer />
				</BoxStatistical>
				<BoxStatistical
					title="Thống kê phòng trọ"
					width="40%"
					icon={<EditFilled style={{ color: "#fff", fontSize: "16px" }} />}
				>
					<BoxRooms />
				</BoxStatistical>
			</div>
			<div className="main-statistical__content">
				<div style={{ flex: 1 }}>
					<BoxStatistical title="Tỷ lệ giới tính">
						<BoxGender />
					</BoxStatistical>
					<BoxStatistical title="Tỷ lệ thanh toán" style={{ marginTop: "16px" }}>
						<BoxPayment />
					</BoxStatistical>
				</div>

				<BoxStatistical title="Biểu đồ doanh thu" width="65%">
					<BoxRevenue />
				</BoxStatistical>
			</div>
		</>
	);
};

export default Mainsection;
