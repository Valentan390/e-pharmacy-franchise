import { FC } from "react";
import { Outlet } from "react-router-dom";

const ShopPage: FC = () => {
  return (
    <div>
      ShopPage
      <Outlet />
    </div>
  );
};

export default ShopPage;
