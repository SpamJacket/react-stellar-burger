import React from "react";

import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-element.module.css";

import { useDispatch } from "react-redux";

import { deleteFromConstructorList } from "../../services/actions/burger-constructor.js";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerElement = ({ filing }) => {
  const dispatch = useDispatch();

  const handleDeleteIngredientClick = React.useCallback(() => {
    dispatch(deleteFromConstructorList(filing.constructorId));
  }, [filing]);

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
