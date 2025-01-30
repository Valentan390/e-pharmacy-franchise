import { FC, Suspense } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const SharedLayout: FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>...Loading page</p>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
