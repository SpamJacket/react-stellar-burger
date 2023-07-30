import React from "react";
import PropTypes from "prop-types";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients.js";

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
  const { ordersUrl } = endpoints;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const constructorList = React.useState({
    bun: null,
    filings: [],
  });

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
            <BurgerIngredients />
            <BurgerConstructor ordersUrl={ordersUrl} />
          </TotalPriceContext.Provider>
        </ConstructorContext.Provider>
      </main>
    </div>
  );
};

App.propTypes = { endpoints: PropTypes.objectOf(PropTypes.string).isRequired };

export default App;
