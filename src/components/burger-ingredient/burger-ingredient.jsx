import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-ingredient.module.css";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  ConstructorContext,
  TotalPriceContext,
} from "../../services/constructorContext.js";

const BurgerIngredient = ({ data, openModal, modalComponent }) => {
  const [counter, setCounter] = React.useState(0);

  const [constructorList, setConstructorList] =
    React.useContext(ConstructorContext);

  const { handleAddIngredientPrice, handleDeleteIngredientPrice } =
    React.useContext(TotalPriceContext);

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

  const handleAddIngredientClick = () => {
    if (data.type === "bun") {
      if (constructorList.bun) {
        handleDeleteIngredientPrice(constructorList.bun.price * 2);
      }
      setConstructorList((prevState) => ({ ...prevState, bun: data }));
      handleAddIngredientPrice(data.price * 2);
    } else {
      setConstructorList((prevState) => ({
        ...prevState,
        filings: [...prevState.filings, data],
      }));
      handleAddIngredientPrice(data.price);
    }
  };

  return (
    <li className={styles.li}>
      <img
        className={styles.img}
        src={data.image}
        alt={data.name}
        onClick={handleAddIngredientClick}
      />
      {counter > 0 && <Counter count={counter} size="default" />}
      <div className={styles.price}>
        <p className={styles.digit}>{data.price}</p>
        <CurrencyIcon />
      </div>
      <p className={styles.name} onClick={handleItemClick}>
        {data.name}
      </p>
    </li>
  );
};

BurgerIngredient.propTypes = {
  data: ingredientPropType.isRequired,
  openModal: PropTypes.func.isRequired,
  modalComponent: PropTypes.object.isRequired,
};

export default BurgerIngredient;
