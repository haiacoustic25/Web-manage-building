// import { Login } from "";
import { RouterType } from "../types/RouterType";

import { lazy } from "react";

const Login = lazy(() =>
  import("../modules/login").then(({ Login }) => ({ default: Login }))
);
const BuildingComponent = lazy(() =>
  import("../modules/buildings").then(({ BuildingComponent }) => ({
    default: BuildingComponent,
  }))
);
const UserComponent = lazy(() =>
  import("../modules/users").then(({ UserComponent }) => ({
    default: UserComponent,
  }))
);
const StatisticalComponent = lazy(() =>
  import("../modules/statistical").then(({ StatisticalComponent }) => ({
    default: StatisticalComponent,
  }))
);

export const url = {
  login: "/login",
  statistical: "/statistical",
  buildingManager: "/building-manager",
  userManager: "/user-manager",
};

export const RouterPublic: RouterType[] = [
  { url: url.login, element: <Login /> },
];

export const RouterAdmin: RouterType[] = [
  { url: url.statistical, element: <StatisticalComponent /> },
  { url: url.buildingManager, element: <BuildingComponent /> },
  { url: url.userManager, element: <UserComponent /> },
];
