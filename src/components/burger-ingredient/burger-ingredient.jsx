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

const BurgerIngredient = ({ ingredientData, counter }) => {
  const dispatch = useDispatch();

  const [ingredient, setIngredient] = React.useState(null);

  const handleCloseModal = React.useCallback(() => {
    setIngredient(null);
  }, [setIngredient]);

  const handleItemClick = React.useCallback(() => {
    setIngredient(ingredientData);
  }, [setIngredient]);

  const handleAddIngredientClick = React.useCallback(() => {
    dispatch(addToConstructorList(ingredientData));
  }, [ingredientData]);

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
