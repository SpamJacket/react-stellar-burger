import React, { FC } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import { useSelector } from "../../services/hooks/hooks";

import styles from "./order-element.module.css";

import OrderElementImage from "../order-element-image/order-element-image";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderElement: FC<{
  data: {
    createdAt: string;
    ingredients: ReadonlyArray<string>;
    name: string;
    number: number;
    status: string;
  };
}> = ({ data: { createdAt, ingredients, name, number, status } }) => {
  const location = useLocation();
  const isPrivateList = useMatch("/profile/orders");
  const ingredientsList = useSelector((store) => store.ingredientsList);

  const translateStatus = React.useMemo<string>(() => {
    switch (status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "В работе";
      case "created":
        return "Создан";
      default:
        return "Что это за заказ?";
    }
  }, [status]);

  const images = React.useMemo<ReadonlyArray<JSX.Element | null>>(() => {
    return ingredients.map((ingredientId, index) => {
      if (ingredientId) {
        const ingredient = ingredientsList.ingredients.find(
          (ingredient) => ingredient._id === ingredientId
        );
        return index < 6 && ingredient ? (
          <OrderElementImage
            key={ingredientId + index}
            index={index}
            orderLength={ingredients.length}
            image={ingredient.image}
            name={ingredient.name}
          />
        ) : null;
      }
      return null;
    });
  }, [ingredients, ingredientsList]);

  const totalPrice = React.useMemo<number>(() => {
    return ingredients.reduce((currentPrice, ingredientId) => {
      if (ingredientId) {
        const ingredient = ingredientsList.ingredients.find(
          (ingredient) => ingredient._id === ingredientId
        );

        return ingredient ? currentPrice + ingredient.price : currentPrice;
      }

      return currentPrice;
    }, 0);
  }, [ingredients, ingredientsList]);

  const dateTime = React.useMemo<string>(() => {
    const newDate = new Date(Date.parse(createdAt));
    const nowDate = new Date(Date.now());
    let newDateTime = "";

    if (
      nowDate.getDate() === newDate.getDate() &&
      nowDate.getMonth() === newDate.getMonth() &&
      nowDate.getFullYear() === newDate.getFullYear()
    ) {
      newDateTime += "Сегодня, ";
    } else if (
      nowDate.getDate() - newDate.getDate() === 1 &&
      nowDate.getMonth() === newDate.getMonth() &&
      nowDate.getFullYear() === newDate.getFullYear()
    ) {
      newDateTime += "Вчера, ";
    } else if (
      nowDate.getDate() - newDate.getDate() === 2 &&
      nowDate.getMonth() === newDate.getMonth() &&
      nowDate.getFullYear() === newDate.getFullYear()
    ) {
      newDateTime += "2 дня назад, ";
    } else {
      newDateTime += `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}, `;
    }

    newDateTime += `${newDate.getHours()}:${("00" + newDate.getMinutes()).slice(
      -2
    )} `;

    const utc = new Date(Date.parse(createdAt));
    const gmt = String(utc).slice(25).slice(0, 8);

    if (gmt.slice(6) === "00") {
      return newDateTime + `i-${gmt.slice(0, 6)}`;
    }

    return newDateTime + `i-${gmt.slice(0, 6)}:${gmt.slice(6)}`;
  }, [createdAt]);

  return (
    <>
      {name && (
        <Link
          to={isPrivateList ? `/profile/orders/${number}` : `/feed/${number}`}
          state={{ previousPage: location }}
          className={styles.link}
        >
          <li className={isPrivateList ? styles.privateOrder : styles.order}>
            <div className={styles.title}>
              <h4 className={styles.number}>{`#${("000000" + number).slice(
                -6
              )}`}</h4>
              <p className={styles.time}>{dateTime}</p>
            </div>
            <h3 className={styles.name}>{name}</h3>
            {isPrivateList && (
              <p className={styles.status}>{translateStatus}</p>
            )}
            <div className={styles.images}>{images}</div>
            <p className={styles.price}>
              <span className={styles.cost}>{totalPrice}</span>
              <CurrencyIcon type="primary" />
            </p>
          </li>
        </Link>
      )}
    </>
  );
};

export default OrderElement;
