import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "../../services/hooks/hooks";

import styles from "./order-view.module.css";

import OrderViewElement from "../order-view-element/order-view-element";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { setOrderView } from "../../services/actionCreators/order-view";
import { orderViewSlice } from "../../services/slices/order-view";

const { cleanOrderView } = orderViewSlice.actions;

const OrderView: FC<{ isPage?: boolean }> = ({ isPage = false }) => {
  const dispatch = useDispatch();
  const { orderNumber } = useParams();

  const ingredientsList = useSelector((store) => store.ingredientsList);

  useEffect(() => {
    if (orderNumber) {
      dispatch(setOrderView(orderNumber));
    }

    return () => {
      dispatch(cleanOrderView());
    };
  }, [dispatch, orderNumber]);

  const { order, orderViewRequest, orderViewFailed } = useSelector(
    (store) => store.orderView
  );
  const {
    name = "",
    ingredients = [],
    status = "",
    createdAt = "",
  } = order ? order[0] : {};

  const uniqIngredients = Array.from(new Set(ingredients));

  const translateStatus = useMemo(() => {
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

  const totalPrice = useMemo(() => {
    return ingredients?.reduce((currentPrice, ingredientId) => {
      if (ingredientId) {
        const ingredient = ingredientsList.ingredients.find(
          (ingredient) => ingredient._id === ingredientId
        );

        return ingredient ? currentPrice + ingredient.price : currentPrice;
      }

      return currentPrice;
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

  const content = useMemo(() => {
    return orderViewRequest ? (
      <h2 className={styles.loaderTitle}>Идет загрузка, подождите</h2>
    ) : (
      <>
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
      </>
    );
  }, [
    orderViewRequest,
    isPage,
    name,
    translateStatus,
    ingredients,
    dateTime,
    totalPrice,
    orderNumber,
  ]);

  return (
    <>
      {orderViewFailed ? (
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>
            Произошла ошибка, перезагрузите страницу
          </h2>
        </div>
      ) : (
        <div className={styles.container}>{content}</div>
      )}
    </>
  );
};

export default OrderView;
