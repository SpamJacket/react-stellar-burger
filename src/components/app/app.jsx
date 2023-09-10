import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import Home from "../../pages/home/home.jsx";
import Login from "../../pages/login/login.jsx";
import Register from "../../pages/register/register.jsx";
import ForgotPassword from "../../pages/forgot-password/forgot-password.jsx";
import ResetPassword from "../../pages/reset-password/reset-password.jsx";
import Profile from "../../pages/profile/profile.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route.jsx";
import ProfileForm from "../profile-form/profile-form.jsx";
import ProfileOrders from "../profile-orders/profile-orders.jsx";
import NotFound from "../../pages/not-found/not-found.jsx";

import { getUser, setAuthChecked } from "../../services/actions/user";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPage = location.state && location.state.previousPage;

  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser());
    } else {
      dispatch(setAuthChecked(true));
    }
  }, []);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={previousPage || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/orders-list" element={<h2>Список заказов</h2>} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route path="" element={<ProfileForm />} />
          <Route path="orders" element={<ProfileOrders />} />
          <Route
            path="orders/:orderId"
            element={<h2>Список заказов пользователя</h2>}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {previousPage && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal closeModal={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
