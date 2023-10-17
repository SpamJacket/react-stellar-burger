import React, { FC } from "react";
import { useSelector } from "../../services/hooks/hooks";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import styles from "./burger-ingredient.module.css";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import type { Ingredient } from "../../utils/types";

const BurgerIngredient: FC<{ ingredientData: Ingredient; counter: number }> =
  React.memo(({ ingredientData, counter }) => {
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
            <CurrencyIcon type={"primary"} />
          </div>
          <p className={styles.name}>{ingredientData.name}</p>
        </>
      );
    }, [ingredientData, counter]);

    return (
      <Link
        to={`/ingredients/${ingredientData._id}`}
        state={{ previousPage: location }}
        className={styles.link}
      >
        {ingredientData.type === "bun" && bun?._id === ingredientData._id ? (
          <li className={styles.element}>{content}</li>
        ) : (
          <li className={styles.element} ref={dragRef}>
            {content}
          </li>
        )}
      </Link>
    );
  });

export default BurgerIngredient;
