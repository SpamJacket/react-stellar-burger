import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

import {
  setIngredientInfo,
  cleanIngredientInfo,
} from "../../services/actions/ingredient-details.js";

import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-ingredient.module.css";

import Modal from "../modal/Modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({ ingredientData, counter }) => {
  const dispatch = useDispatch();

  const { bun } = useSelector((store) => store.constructorList);

  const { ingredient } = useSelector((store) => store.ingredientDetails);

  const [{}, dragRef] = useDrag({
    type: "ingredient",
    item: ingredientData,
  });

  const handleItemClick = React.useCallback(() => {
    dispatch(setIngredientInfo(ingredientData));
  }, [ingredientData]);

  const handleCloseModal = React.useCallback(() => {
    dispatch(cleanIngredientInfo());
  }, [ingredientData]);

  const content = React.useMemo(() => {
    return (
      <>
        <img
          className={styles.img}
          src={ingredientData.image}
          alt={ingredientData.name}
        />
        {counter > 0 && <Counter count={counter} size="default" />}
        <div className={styles.price}>
          <p className={styles.digit}>{ingredientData.price}</p>
          <CurrencyIcon />
        </div>
        <p className={styles.name}>{ingredientData.name}</p>
      </>
    );
  }, [ingredientData, counter]);

  return (
    <>
      {ingredientData.type === "bun" &&
      bun &&
      bun._id === ingredientData._id ? (
        <li className={styles.li} onClick={handleItemClick}>
          {content}
        </li>
      ) : (
        <li ref={dragRef} className={styles.li} onClick={handleItemClick}>
          {content}
        </li>
      )}
      {ingredient && ingredient._id === ingredientData._id && (
        <Modal closeModal={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropType.isRequired,
  counter: PropTypes.number.isRequired,
};

export default BurgerIngredient;
