import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import Home from "../../pages/home/home.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousPage = location.state && location.state.previousPage;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={previousPage || location}>
        <Route path="/" element={<Home />} />
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
