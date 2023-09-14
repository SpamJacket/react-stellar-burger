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
import OrdersList from "../orders-list/orders-list";
import NotFound from "../../pages/not-found/not-found.jsx";
import IngredientDetailsPage from "../../pages/ingredient-details/ingredient-details";
import FeedPage from "../../pages/feed/feed.jsx";
import OrderView from "../order-view/order-view";

import { getUser, setAuthChecked } from "../../services/actions/user.js";
import { getIngredients } from "../../services/actions/burger-ingredients.js";
import OrderViewPage from "../../pages/order-view/order-view";

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

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

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
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route path="" element={<ProfileForm />} />
          <Route path="orders" element={<OrdersList />} />
        </Route>
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetailsPage />}
        />
        <Route path="/feed/:orderId" element={<OrderViewPage />} />
        <Route
          path="/profile/orders/:orderId"
          element={<OnlyAuth component={<OrderViewPage />} />}
        />
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
          <Route
            path="/profile/orders/:orderId"
            element={
              <Modal closeModal={handleModalClose}>
                <OrderView />
              </Modal>
            }
          />
          <Route
            path="/feed/:orderId"
            element={
              <Modal closeModal={handleModalClose}>
                <OrderView />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
