import React, { FC } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/hooks/hooks";

import styles from "./app.module.css";

import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import NotFound from "../../pages/not-found/not-found";
import IngredientDetailsPage from "../../pages/ingredient-details/ingredient-details";
import FeedPage from "../../pages/feed/feed";
import OrderViewPage from "../../pages/order-view/order-view";

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import ProfileForm from "../profile-form/profile-form";
import OrdersList from "../orders-list/orders-list";
import OrderView from "../order-view/order-view";

import { getUser } from "../../services/actionCreators/user";
import { userSlice } from "../../services/slices/user";
import { getIngredients } from "../../services/actionCreators/burger-ingredients";
import type { PreviousPage } from "../../utils/types";

const { setAuthChecked } = userSlice.actions;

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPage: PreviousPage =
    location.state && location.state.previousPage;

  React.useEffect(() => {
    dispatch(getIngredients());
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser());
    } else {
      dispatch(setAuthChecked(true));
    }
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={previousPage || location}>
        <Route path="/react-stellar-burger/" element={<Home />} />
        <Route
          path="/react-stellar-burger/login"
          element={<OnlyUnAuth component={<Login />} />}
        />
        <Route
          path="/react-stellar-burger/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path="/react-stellar-burger/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/react-stellar-burger/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/react-stellar-burger/feed" element={<FeedPage />} />
        <Route
          path="/react-stellar-burger/profile"
          element={<OnlyAuth component={<Profile />} />}
        >
          <Route path="" element={<ProfileForm />} />
          <Route path="orders" element={<OrdersList />} />
        </Route>
        <Route
          path="/react-stellar-burger/ingredients/:ingredientId"
          element={<IngredientDetailsPage />}
        />
        <Route
          path="/react-stellar-burger/feed/:orderNumber"
          element={<OrderViewPage />}
        />
        <Route
          path="/react-stellar-burger/profile/orders/:orderNumber"
          element={<OnlyAuth component={<OrderViewPage />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {previousPage && (
        <Routes>
          <Route
            path="/react-stellar-burger/ingredients/:ingredientId"
            element={
              <Modal closeModal={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/react-stellar-burger/profile/orders/:orderNumber"
            element={
              <Modal closeModal={handleModalClose}>
                <OrderView />
              </Modal>
            }
          />
          <Route
            path="/react-stellar-burger/feed/:orderNumber"
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
