import React from "react";
import PropTypes from "prop-types";

import styles from "./app.module.css";

import getData from "../../utils/api.js";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

import Modal from "../modal/Modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderDetails from "../order-details/order-details.jsx";

import {
  ConstructorContext,
  TotalPriceContext,
} from "../../services/constructorContext.js";

const initialTotalPrice = { totalPrice: 0 };

const reducerTotalPrice = (totalPriceState, action) => {
  switch (action.type) {
    case "increment":
      return { totalPrice: totalPriceState.totalPrice + action.value };
    case "decrement":
      return { totalPrice: totalPriceState.totalPrice - action.value };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

const App = ({ apiUrls }) => {
  const { ingredientsUrl, ordersUrl } = apiUrls;

  const [dataState, setDataState] = React.useState({
    data: null,
    isLoading: true,
  });

  const constructorList = React.useState({
    bun: null,
    filings: [],
  });

  React.useEffect(() => {
    getData(ingredientsUrl, setDataState);
  }, []);

  const [totalPriceState, dispatchTotalPrice] = React.useReducer(
    reducerTotalPrice,
    initialTotalPrice
  );

  const handleAddIngredientPrice = (ingredientPrice) => {
    dispatchTotalPrice({ type: "increment", value: ingredientPrice });
  };

  const handleDeleteIngredientPrice = (ingredientPrice) => {
    dispatchTotalPrice({ type: "decrement", value: ingredientPrice });
  };

  const [isOpened, setIsOpened] = React.useState(false);
  const modalComponent = React.useRef();

  const openModal = React.useCallback(() => {
    setIsOpened(true);
  });

  const closeModal = React.useCallback(() => {
    setIsOpened(false);
  });

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      animateClosing();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  const modalRef = React.useRef();
  const overlayRef = React.useRef();

  const animateOpening = () => {
    openModal();
    setTimeout(() => {
      overlayRef.current.style = "opacity: 1";
      modalRef.current.style = "opacity: 1";
    }, 0);
  };

  const animateClosing = () => {
    modalRef.current.style = "opacity: 0";
    setTimeout(() => {
      overlayRef.current.style = "opacity: 0";
    }, 100);
    setTimeout(closeModal, 300);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {dataState.data && !dataState.isLoading && (
        <main className={styles.main}>
          <h2 className={styles.title}>Соберите бургер</h2>
          <ConstructorContext.Provider value={constructorList}>
            <TotalPriceContext.Provider
              value={{
                totalPriceState,
                handleAddIngredientPrice,
                handleDeleteIngredientPrice,
              }}
            >
              <BurgerIngredients
                data={dataState.data}
                openModal={animateOpening}
                modalComponent={modalComponent}
              />
              <BurgerConstructor
                ordersUrl={ordersUrl}
                openModal={animateOpening}
                modalComponent={modalComponent}
              />
            </TotalPriceContext.Provider>
          </ConstructorContext.Provider>
        </main>
      )}
      {!dataState.data && dataState.isLoading && (
        <h2 className={styles.errorTitle}>
          Подождите, идет загрузка конструктора
        </h2>
      )}
      {isOpened && modalComponent.current.type === "ingredient" && (
        <Modal
          closeModal={animateClosing}
          modalRef={modalRef}
          overlayRef={overlayRef}
        >
          <IngredientDetails data={modalComponent.current.ingredient} />
        </Modal>
      )}
      {isOpened && modalComponent.current.type === "order" && (
        <Modal
          closeModal={animateClosing}
          modalRef={modalRef}
          overlayRef={overlayRef}
        >
          <OrderDetails data={modalComponent.current.order} />
        </Modal>
      )}
    </div>
  );
};

App.propTypes = { apiUrls: PropTypes.objectOf(PropTypes.string).isRequired };

export default App;
