import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

const PublicRoute: FC = () => {
  const { isLogin, token } = useCurrentUser();

  if (!isLogin && token) {
    return <p>...Loading</p>;
  }

  if (isLogin) {
    return <Navigate to="shop/create-shop" />;
  }

  return <Outlet />;
};

export default PublicRoute;
