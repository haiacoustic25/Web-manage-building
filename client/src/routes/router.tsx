import { Suspense } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import LoadingFullPage from "../components/loadingFullPage";
import { RootState, store, useAppSelector } from "../redux/store";
import { RouterType } from "../types/RouterType";
// import { RouterType } from "../types/Route";
import { RouterAdmin, RouterPublic } from "./listRouter";

const AuthWrapper = () => {
  const userAccessToken = useAppSelector(
    (state: RootState) => state.dataUser.access_token
  );
  // console.log({ userAccessToken });
  if (userAccessToken) {
    return <Outlet />;
  }
  return <Navigate to={"/login"} replace />;
};

const AdminRoleWrapper = () => {
  const userAccessToken = useAppSelector(
    (state: RootState) => state.dataUser.access_token
  );
  if (userAccessToken) {
    return <Outlet />;
  }
  return <Navigate to={"/login"} replace />;
};

export const Router = () => {
  return (
    <Suspense fallback={<LoadingFullPage />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        {RouterPublic.map((item) => {
          return (
            <Route path={item.url} element={item.element} key={item.url} />
          );
        })}
        <Route element={<AuthWrapper />}>
          <Route element={<AdminRoleWrapper />}>
            {RouterAdmin.map((_: RouterType) => {
              return <Route path={_.url} element={_.element} key={_.url} />;
            })}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
