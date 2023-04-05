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
  import('../modules/customer').then(({ UserComponent }) => ({
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

export const url = {
  login: '/login',
  dashboard: '/',
  statistical: '/statistical',
  userManager: '/user-manager',
  roomManager: '/room',
};

export const RouterPublic: RouterType[] = [{ url: url.login, element: <Login /> }];

export const RouterAdmin: RouterType[] = [
  { url: url.statistical, element: <StatisticalComponent /> },
  { url: url.userManager, element: <UserComponent /> },
  { url: url.roomManager, element: <RoomComponent /> },
  { url: url.dashboard, element: <DashboardComponent /> },
];
