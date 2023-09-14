import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import styles from "./order-view.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import OrderViewElement from "../order-view-element/order-view-element";

import {
  setOrderView,
  cleanOrderView,
} from "../../services/actions/order-view";

const OrderView = ({ isPage }) => {
  const dispatch = useDispatch();
  const { orderNumber } = useParams();

  const ingredientsList = useSelector((store) => store.ingredientsList);

  useEffect(() => {
    dispatch(setOrderView(orderNumber));

    return () => {
      dispatch(cleanOrderView());
    };
  }, []);

  const { order } = useSelector((store) => store.orderView);
  const { name, ingredients, status, createdAt } = order ? order[0] : {};

  const uniqIngredients = Array.from(new Set(ingredients));

  const translateStatus = useMemo(() => {
    switch (status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "В работе";
      case "created":
        return "Создан";
    }
  }, [status]);

  const totalPrice = useMemo(() => {
    return ingredients?.reduce((currentPrice, ingredientId) => {
      const ingredient = ingredientsList.ingredients.find(
        (ingredient) => ingredient._id === ingredientId
      );

      return currentPrice + ingredient.price;
    }, 0);
  }, [ingredients, ingredientsList]);

  const dateTime = useMemo(() => {
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
        <div className={styles.container}>
          <h4 className={isPage ? styles.centerNumber : styles.number}>
            {`#${("000000" + orderNumber).slice(-6)}`}
          </h4>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.status}>{translateStatus}</p>
          <div className={styles.structure}>
            <h5 className={styles.title}>Состав:</h5>
            <ul className={styles.list}>
              {uniqIngredients.map((ingredient, index) => {
                return (
                  <OrderViewElement
                    key={ingredient + index}
                    ingredientId={ingredient}
                  />
                );
              })}
            </ul>
          </div>
          <div className={styles.subtitle}>
            <p className={styles.time}>{dateTime}</p>
            <p className={styles.price}>
              <span className={styles.cost}>{totalPrice}</span>
              <CurrencyIcon type="primary" />
            </p>
          </div>
        </div>
      )}
    </>
  );
};

OrderView.defaultProps = {
  isPage: false,
};

OrderView.propTypes = {
  isPage: PropTypes.bool,
};

export default OrderView;
