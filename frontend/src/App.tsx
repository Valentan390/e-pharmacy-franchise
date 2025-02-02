import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CreateShopPage from "./pages/CreateShopPage/CreateShopPage";
import EditShopPage from "./pages/EditShopPage/EditShopPage";
import { useAppDispatch } from "./hooks";
import { useEffect } from "react";
import { currentThunk } from "./redux/authUser/authUserOperations";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(currentThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/shop">
            <Route index element={<CreateShopPage />} />
            <Route path="edit-shop" element={<EditShopPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
