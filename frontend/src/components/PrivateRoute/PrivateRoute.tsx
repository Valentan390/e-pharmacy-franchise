import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: FC = () => {
  const isLogin = false;
  const token = false;

  if (!isLogin && token) {
    return <p>...Loading</p>;
  }

  if (!isLogin && !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
