// import { Login } from "";
import { RouterType } from "../types/RouterType";

import { lazy } from "react";

const Login = lazy(() => import("../modules/login").then(({ Login }) => ({ default: Login })));
const Register = lazy(() =>
	import("../modules/register").then(({ Register }) => ({ default: Register })),
);

const RoomComponent = lazy(() =>
	import("../modules/rooms").then(({ RoomComponent }) => ({
		default: RoomComponent,
	})),
);
const UserComponent = lazy(() =>
	import("../modules/customer/Active").then(({ UserComponent }) => ({
		default: UserComponent,
	})),
);
const StatisticalComponent = lazy(() =>
	import("../modules/statistical").then(({ StatisticalComponent }) => ({
		default: StatisticalComponent,
	})),
);
const DashboardComponent = lazy(() =>
	import("../modules/dashboard").then(({ DashboardComponent }) => ({
		default: DashboardComponent,
	})),
);
const UserNonActiveComponent = lazy(() =>
	import("../modules/customer/Non-active").then(({ UseNonActiveComponent }) => ({
		default: UseNonActiveComponent,
	})),
);
const ReportComponent = lazy(() =>
	import("../modules/reports").then(({ ReportComponent }) => ({
		default: ReportComponent,
	})),
);

const BookingComponent = lazy(() =>
	import("../modules/booking").then(({ BookingComponent }) => ({
		default: BookingComponent,
	})),
);
const FurnitureComponent = lazy(() =>
	import("../modules/furniture").then(({ FurnitureComponent }) => ({
		default: FurnitureComponent,
	})),
);
const HistoryEmailComponent = lazy(() =>
	import("../modules/historySendEmail").then(({ HistoryEmailComponent }) => ({
		default: HistoryEmailComponent,
	})),
);
const SettingComponent = lazy(() =>
	import("../modules/setting").then(({ SettingComponent }) => ({
		default: SettingComponent,
	})),
);
const PageCreateRoom = lazy(() =>
	import("../modules/rooms/PageCreateRoom").then(({ PageCreateRoom }) => ({
		default: PageCreateRoom,
	})),
);
const DebtComponent = lazy(() =>
	import("../modules/debt").then(({ DebtComponent }) => ({
		default: DebtComponent,
	})),
);
const PageDetailDebt = lazy(() =>
	import("../modules/debt/PageDetailDebt").then(({ PageDetailDebt }) => ({
		default: PageDetailDebt,
	})),
);

export const url = {
	login: "/login",
	register: "/register",
	dashboard: "/",
	statistical: "/statistical",
	userManager: "/user-manager",
	userNonActiveManager: "/user-manager-non-active",
	roomManager: "/room",
	reportManager: "/report",
	bookingManager: "/booking",
	furnitureManager: "/furniture",
	history: "/history",
	setting: "/setting",
	createRoom: "/room/create",
	debt: "/debt",
	detailDebt: "/debt/:roomId",
};

export const RouterPublic: RouterType[] = [
	{ url: url.login, element: <Login /> },
	{ url: url.register, element: <Register /> },
];

export const RouterAdmin: RouterType[] = [
	{ url: url.statistical, element: <StatisticalComponent /> },
	{ url: url.userManager, element: <UserComponent /> },
	{ url: url.roomManager, element: <RoomComponent /> },
	{ url: url.userNonActiveManager, element: <UserNonActiveComponent /> },
	{ url: url.dashboard, element: <DashboardComponent /> },
	{ url: url.reportManager, element: <ReportComponent /> },
	{ url: url.bookingManager, element: <BookingComponent /> },
	{ url: url.furnitureManager, element: <FurnitureComponent /> },
	{ url: url.history, element: <HistoryEmailComponent /> },
	{ url: url.setting, element: <SettingComponent /> },
	{ url: url.createRoom, element: <PageCreateRoom /> },
	{ url: url.debt, element: <DebtComponent /> },
	{ url: url.detailDebt, element: <PageDetailDebt /> },
];
