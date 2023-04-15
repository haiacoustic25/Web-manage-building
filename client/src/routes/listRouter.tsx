// import { Login } from "";
import { RouterType } from '../types/RouterType';

import { lazy } from 'react';

const Login = lazy(() => import('../modules/login').then(({ Login }) => ({ default: Login })));

const RoomComponent = lazy(() =>
  import('../modules/rooms').then(({ RoomComponent }) => ({
    default: RoomComponent,
  }))
);
const UserComponent = lazy(() =>
  import('../modules/customer/Active').then(({ UserComponent }) => ({
    default: UserComponent,
  }))
);
const StatisticalComponent = lazy(() =>
  import('../modules/statistical').then(({ StatisticalComponent }) => ({
    default: StatisticalComponent,
  }))
);
const DashboardComponent = lazy(() =>
  import('../modules/dashboard').then(({ DashboardComponent }) => ({
    default: DashboardComponent,
  }))
);
const UserNonActiveComponent = lazy(() =>
  import('../modules/customer/Non-active').then(({ UseNonActiveComponent }) => ({
    default: UseNonActiveComponent,
  }))
);
const ReportComponent = lazy(() =>
  import('../modules/reports').then(({ ReportComponent }) => ({
    default: ReportComponent,
  }))
);

export const url = {
  login: '/login',
  dashboard: '/',
  statistical: '/statistical',
  userManager: '/user-manager',
  userNonActiveManager: '/user-manager-non-active',
  roomManager: '/room',
  reportManager: '/report',
};

export const RouterPublic: RouterType[] = [{ url: url.login, element: <Login /> }];

export const RouterAdmin: RouterType[] = [
  { url: url.statistical, element: <StatisticalComponent /> },
  { url: url.userManager, element: <UserComponent /> },
  { url: url.roomManager, element: <RoomComponent /> },
  { url: url.userNonActiveManager, element: <UserNonActiveComponent /> },
  { url: url.dashboard, element: <DashboardComponent /> },
  { url: url.reportManager, element: <ReportComponent /> },
];
