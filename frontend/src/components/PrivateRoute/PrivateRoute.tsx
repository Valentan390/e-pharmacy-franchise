import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

const PrivateRoute: FC = () => {
  const { isLogin, token } = useCurrentUser();

  if (!isLogin && token) {
    return <p>...Loading</p>;
  }

  if (!isLogin && !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
