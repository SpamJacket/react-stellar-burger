import React, { FC } from "react";
import { useSelector } from "../../services/hooks/hooks";

import styles from "./order-view-element.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";

const OrderViewElement: FC<{ ingredientId: string }> = ({ ingredientId }) => {
  const ingredientsList = useSelector((store) => store.ingredientsList);
  const ingredient: TIngredient | undefined = ingredientsList.ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );

  const { order } = useSelector((store) => store.orderView);
  const { ingredients = [] } = order ? order[0] : {};

  const counter = React.useMemo<number>(() => {
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

export default OrderViewElement;
