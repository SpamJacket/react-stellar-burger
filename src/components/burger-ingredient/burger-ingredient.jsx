import React from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-ingredient.module.css";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = React.memo(({ ingredientData, counter }) => {
  const location = useLocation();

  const { bun } = useSelector((store) => store.constructorList);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredientData,
  });

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
      {ingredientData.type === "bun" && bun?._id === ingredientData._id ? (
        <li>
          <Link
            to={`/ingredients/${ingredientData._id}`}
            state={{ previousPage: location }}
            className={styles.link}
          >
            {content}
          </Link>
        </li>
      ) : (
        <li ref={dragRef}>
          <Link
            to={`/ingredients/${ingredientData._id}`}
            state={{ previousPage: location }}
            className={styles.link}
          >
            {content}
          </Link>
        </li>
      )}
    </>
  );
});

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropType.isRequired,
  counter: PropTypes.number.isRequired,
};

export default BurgerIngredient;
