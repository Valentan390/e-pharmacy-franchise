import { FC, Suspense } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import useCurrentUser from "../../hooks/useCurrentUser";

const SharedLayout: FC = () => {
  const { isLogin } = useCurrentUser();
  return (
    <>
      <Header />
      <Suspense fallback={<p>...Loading page</p>}>
        <Outlet />
      </Suspense>
      {isLogin && <Footer />}
    </>
  );
};

export default SharedLayout;
