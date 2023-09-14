import React from "react";
import { Link, useLocation, useMatch } from "react-router-dom";

import { orderPropType } from "../../utils/prop-types";

import styles from "./order-element.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const OrderElement = ({
  data: { createdAt, ingredients, name, number, status },
}) => {
  const location = useLocation();
  const isPrivateList = useMatch("/profile/orders");
  const ingredientsList = useSelector((store) => store.ingredientsList);

  const translateStatus = React.useMemo(() => {
    switch (status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "В работе";
      case "created":
        return "Создан";
    }
  }, [status]);

  const images = React.useMemo(() => {
    return ingredients.map((ingredientId, index) => {
      const ingredient = ingredientsList.ingredients.find(
        (ingredient) => ingredient._id === ingredientId
      );
      return index < 6 ? (
        <div
          key={ingredientId + index}
          className={
            index === 5 && ingredients.length > 6
              ? styles.lastImageContainer
              : styles.imageContainer
          }
          style={{
            translate: `calc(-16px * ${index})`,
            zIndex: `${ingredients.length - index - 1}`,
          }}
        >
          <img
            className={
              index === 5 && ingredients.length > 6
                ? styles.lastImage
                : styles.image
            }
            src={ingredient.image}
            alt="Флюоресцентная булка R2-D3"
          />
          {index === 5 && ingredients.length > 6 && (
            <p className={styles.extra}>{`+${ingredients.length - 6}`}</p>
          )}
        </div>
      ) : null;
    });
  }, [ingredients, ingredientsList]);

  const totalPrice = React.useMemo(() => {
    return ingredients.reduce((currentPrice, ingredientId) => {
      const ingredient = ingredientsList.ingredients.find(
        (ingredient) => ingredient._id === ingredientId
      );
      if (ingredient.type === "bun") {
        return currentPrice + ingredient.price * 2;
      }

      return currentPrice + ingredient.price;
    }, 0);
  }, []);

  return (
    <Link
      to={isPrivateList ? `/profile/orders/${123456}` : `/feed/${123456}`}
      state={{ previousPage: location }}
      className={styles.link}
    >
      <li className={isPrivateList ? styles.privateOrder : styles.order}>
        <div className={styles.title}>
          <h4 className={styles.number}>{`#${number}`}</h4>
          <p className={styles.time}>{createdAt}</p>
        </div>
        <h3 className={styles.name}>{name}</h3>
        {isPrivateList && <p className={styles.status}>{translateStatus}</p>}
        <div className={styles.images}>{images}</div>
        <p className={styles.price}>
          <span className={styles.cost}>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
      </li>
    </Link>
  );
};

OrderElement.propTypes = {
  data: orderPropType.isRequired,
};

export default OrderElement;
