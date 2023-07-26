import React from "react";
import PropTypes from "prop-types";

import styles from "./app.module.css";

import getData from "../../utils/api.js";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

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
    case "reset":
      return { totalPrice: 0 };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

const App = ({ endpoints }) => {
  const { ingredientsUrl, ordersUrl } = endpoints;

  const [dataState, setDataState] = React.useState({
    data: null,
    isLoading: true,
  });

  const constructorList = React.useState({
    bun: null,
    filings: [],
  });

  React.useEffect(() => {
    getData(ingredientsUrl, setDataState)
      .then((res) => {
        setDataState({ data: res.data, isLoading: false });
      })
      .catch((err) => console.log(err));
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

  const handleResetIngredientPrice = () => {
    dispatchTotalPrice({ type: "reset" });
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
                handleResetIngredientPrice,
              }}
            >
              <BurgerIngredients data={dataState.data} />
              <BurgerConstructor ordersUrl={ordersUrl} />
            </TotalPriceContext.Provider>
          </ConstructorContext.Provider>
        </main>
      )}
      {!dataState.data && dataState.isLoading && (
        <h2 className={styles.errorTitle}>
          Подождите, идет загрузка конструктора
        </h2>
      )}
    </div>
  );
};

App.propTypes = { endpoints: PropTypes.objectOf(PropTypes.string).isRequired };

export default App;
