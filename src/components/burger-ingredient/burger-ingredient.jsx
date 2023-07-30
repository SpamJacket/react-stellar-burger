import React from "react";
import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-ingredient.module.css";

import Modal from "../modal/Modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";

import { useSelector, useDispatch } from "react-redux";
import { addToConstructorList } from "../../services/actions/burger-constructor.js";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { TotalPriceContext } from "../../services/constructorContext.js";

const BurgerIngredient = ({ ingredientData }) => {
  const dispatch = useDispatch();

  const [ingredient, setIngredient] = React.useState(null);

  const handleCloseModal = React.useCallback(() => {
    setIngredient(null);
  }, [setIngredient]);

  const [counter, setCounter] = React.useState(0);

  const bun = useSelector((store) => store.ingredientsList.bun);

  const { handleAddIngredientPrice, handleDeleteIngredientPrice } =
    React.useContext(TotalPriceContext);

  const handleItemClick = () => {
    setIngredient(ingredientData);
  };

  const handleAddIngredientClick = () => {
    dispatch(addToConstructorList(ingredientData));
    if (ingredientData.type === "bun") {
      if (bun) {
        handleDeleteIngredientPrice(bun.price * 2);
      }
      handleAddIngredientPrice(ingredientData.price * 2);
    } else {
      handleAddIngredientPrice(ingredientData.price);
    }
  };

  return (
    <>
      <li className={styles.li}>
        <img
          className={styles.img}
          src={ingredientData.image}
          alt={ingredientData.name}
          onClick={handleAddIngredientClick}
        />
        {counter > 0 && <Counter count={counter} size="default" />}
        <div className={styles.price}>
          <p className={styles.digit}>{ingredientData.price}</p>
          <CurrencyIcon />
        </div>
        <p className={styles.name} onClick={handleItemClick}>
          {ingredientData.name}
        </p>
      </li>
      {ingredient && (
        <Modal closeModal={handleCloseModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropType.isRequired,
};

export default BurgerIngredient;
