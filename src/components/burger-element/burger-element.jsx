import React from "react";

import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-element.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { TotalPriceContext } from "../../services/constructorContext.js";

const BurgerElement = ({ filing }) => {
  const { handleDeleteIngredientPrice } = React.useContext(TotalPriceContext);

  const handleDeleteIngredientClick = () => {
    handleDeleteIngredientPrice(filing.price);
  };

  return (
    <li className={styles.item}>
      <DragIcon />
      <ConstructorElement
        text={filing.name}
        price={filing.price}
        thumbnail={filing.image}
        extraClass={[styles.element_background_dark, styles.element]}
        handleClose={handleDeleteIngredientClick}
      />
    </li>
  );
};

BurgerElement.propTypes = { filing: ingredientPropType.isRequired };

export default BurgerElement;
