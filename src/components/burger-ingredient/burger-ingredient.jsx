import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-ingredient.module.css";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({ data, counter, openModal, modalComponent }) => {
  const handleItemClick = React.useCallback(() => {
    modalComponent.current = {
      type: "ingredient",
      ingredient: {
        image: data.image,
        name: data.name,
        calories: data.calories,
        proteins: data.proteins,
        fat: data.fat,
        carbohydrates: data.carbohydrates,
      },
    };
    openModal();
  });

  return (
    <li className={styles.li} onClick={handleItemClick}>
      <img className={styles.img} src={data.image} alt={data.name} />
      {counter > 0 && <Counter count={counter} size="default" />}
      <div className={styles.price}>
        <p className={styles.digit}>{data.price}</p>
        <CurrencyIcon />
      </div>
      <p className={styles.name}>{data.name}</p>
    </li>
  );
};

BurgerIngredient.defaultProps = {
  counter: 0,
};

BurgerIngredient.propTypes = {
  data: ingredientPropType.isRequired,
  counter: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  modalComponent: PropTypes.object.isRequired,
};

export default BurgerIngredient;
