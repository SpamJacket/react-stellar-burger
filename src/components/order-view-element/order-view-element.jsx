import React from "react";
import { useSelector } from "../../services/hooks/hooks";
import PropTypes from "prop-types";

import styles from "./order-view-element.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderViewElement = ({ ingredientId }) => {
  const ingredientsList = useSelector((store) => store.ingredientsList);
  const ingredient = ingredientsList.ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );

  const { order } = useSelector((store) => store.orderView);
  const { ingredients } = order ? order[0] : {};

  const counter = React.useMemo(() => {
    return ingredients.reduce((currentCount, ingredient) => {
      return ingredient === ingredientId ? currentCount + 1 : currentCount;
    }, 0);
  }, [ingredients, ingredientId]);

  return (
    <>
      {ingredientId && ingredient && (
        <li className={styles.ingredient}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={ingredient.image}
              alt={ingredient.name}
            />
          </div>
          <p className={styles.name}>{ingredient.name}</p>
          <p className={styles.price}>
            <span
              className={styles.cost}
            >{`${counter} X ${ingredient.price}`}</span>
            <CurrencyIcon type="primary" />
          </p>
        </li>
      )}
    </>
  );
};

OrderViewElement.propTypes = {
  ingredientId: PropTypes.string.isRequired,
};

export default OrderViewElement;
