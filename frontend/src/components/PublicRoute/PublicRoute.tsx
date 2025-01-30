import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute: FC = () => {
  const isLogin = true;
  const token = true;

  if (!isLogin && token) {
    return <p>...Loading</p>;
  }

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
