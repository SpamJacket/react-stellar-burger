import React from "react";

import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-element.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  ConstructorContext,
  TotalPriceContext,
} from "../../services/constructorContext.js";

const BurgerElement = ({ data }) => {
  const [constructorList, setConstructorList] =
    React.useContext(ConstructorContext);

  const { handleDeleteIngredientPrice } = React.useContext(TotalPriceContext);

  const handleDeleteIngredientClick = () => {
    handleDeleteIngredientPrice(data.price);
  };

  return (
    <li className={styles.item}>
      <DragIcon />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        extraClass={[styles.element_background_dark, styles.element]}
        handleClose={handleDeleteIngredientClick}
      />
    </li>
  );
};

BurgerElement.propTypes = { data: ingredientPropType.isRequired };

export default BurgerElement;
