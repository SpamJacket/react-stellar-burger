import React from "react";
import PropTypes from "prop-types";

import styles from "./burger-constructor.module.css";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerElement from "../burger-element/burger-element.jsx";

import {
  ConstructorContext,
  TotalPriceContext,
} from "../../services/constructorContext.js";

import { sendOrderData } from "../../utils/api.js";

const BurgerConstructor = ({ ordersUrl, openModal, modalComponent }) => {
  const [constructorList] = React.useContext(ConstructorContext);

  const { totalPriceState } = React.useContext(TotalPriceContext);

  const handleOrderButtonClick = React.useCallback(() => {
    const ingredients = [constructorList.bun._id];
    constructorList.filings.forEach((filing) => ingredients.push(filing._id));

    sendOrderData(ordersUrl, ingredients).then((data) => {
      const order = {
        name: data.name,
        orderId: ("000000" + data.order.number).slice(-6),
        price: totalPriceState.totalPrice,
      };
      modalComponent.current = { type: "order", order };
      openModal();
    });
  });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {constructorList.bun && (
          <ConstructorElement
            key={0}
            type="top"
            isLocked={true}
            text={constructorList.bun.name + " (верх)"}
            price={constructorList.bun.price}
            thumbnail={constructorList.bun.image}
            extraClass={[styles.element_background_dark, styles.borderElement]}
          />
        )}
        <ul className={styles.list}>
          {constructorList.filings.map((el, index) => (
            <BurgerElement key={index + 2} data={el} />
          ))}
        </ul>
        {constructorList.bun && (
          <ConstructorElement
            key={1}
            type="bottom"
            isLocked={true}
            text={constructorList.bun.name + " (низ)"}
            price={constructorList.bun.price}
            thumbnail={constructorList.bun.image}
            extraClass={[styles.element_background_dark, styles.borderElement]}
          />
        )}
      </div>
      <div className={styles.price}>
        <p className={styles.digit}>{totalPriceState.totalPrice}</p>
        <CurrencyIcon />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass={styles.btn}
        onClick={handleOrderButtonClick}
      >
        Оформить заказ
      </Button>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ordersUrl: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  modalComponent: PropTypes.object.isRequired,
};

export default BurgerConstructor;
