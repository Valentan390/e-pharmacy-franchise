import { Navigate, Route, Routes } from "react-router-dom";
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
import ShopPage from "./pages/ShopPage/ShopPage";
import AllMedicines from "./components/AllMedicines/AllMedicines.tsx";
import DrugStore from "./components/DrugStore/DrugStore.tsx";
import useCurrentUser from "./hooks/useCurrentUser.ts";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

const App = () => {
  const { isLoading } = useCurrentUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={
            <Navigate to={isLoading ? "/shop/create-shop" : "/register"} />
          }
        />
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/shop" element={<ShopPage />}>
            <Route path="create-shop" element={<CreateShopPage />} />
            <Route path="edit-shop" element={<EditShopPage />} />
          </Route>

          <Route path="/medicine" element={<ShopPage />}>
            <Route path="drugStore" element={<DrugStore />} />
            <Route path="allMedicines" element={<AllMedicines />} />
          </Route>

          <Route path="/statistics" element={<StatisticsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
