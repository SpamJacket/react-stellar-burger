import React from "react";
import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-ingredient.module.css";

import Modal from "../modal/Modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  ConstructorContext,
  TotalPriceContext,
} from "../../services/constructorContext.js";

const BurgerIngredient = ({ data }) => {
  const [ingredient, setIngredient] = React.useState(null);

  const handleCloseModal = () => {
    setIngredient(null);
  };

  const [counter, setCounter] = React.useState(0);

  const [constructorList, setConstructorList] =
    React.useContext(ConstructorContext);

  const { handleAddIngredientPrice, handleDeleteIngredientPrice } =
    React.useContext(TotalPriceContext);

  const handleItemClick = () => {
    setIngredient(data);
  };

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
    <>
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
      {ingredient && (
        <Modal closeModal={handleCloseModal}>
          <IngredientDetails data={ingredient} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredient.propTypes = {
  data: ingredientPropType.isRequired,
};

export default BurgerIngredient;
