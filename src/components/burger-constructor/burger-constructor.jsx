import React from "react";
import PropTypes from "prop-types";

import styles from "./burger-constructor.module.css";

import Modal from "../modal/Modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";

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

const BurgerConstructor = ({ ordersUrl }) => {
  const [constructorList, setConstructorList] =
    React.useContext(ConstructorContext);

  const { totalPriceState, handleResetIngredientPrice } =
    React.useContext(TotalPriceContext);

  const [order, setOrder] = React.useState({
    data: null,
    isLoading: false,
  });

  const handleOrderButtonClick = () => {
    const ingredients = [constructorList.bun._id];
    constructorList.filings.forEach((filing) => ingredients.push(filing._id));

    sendOrderData(ordersUrl, setOrder, ingredients)
      .then((res) => {
        setOrder({
          data: {
            name: res.name,
            orderId: ("000000" + res.order.number).slice(-6),
            price: totalPriceState.totalPrice,
          },
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));

    setConstructorList({
      bun: null,
      filings: [],
    });
    handleResetIngredientPrice();
  };

  const handleCloseModal = () => {
    setOrder({
      data: null,
      isLoading: false,
    });
  };

  return (
    <>
      {order.isLoading && <h2>Идет оформление заказа, подождите</h2>}
      {!order.isLoading && (
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
                extraClass={[
                  styles.element_background_dark,
                  styles.borderElement,
                ]}
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
                extraClass={[
                  styles.element_background_dark,
                  styles.borderElement,
                ]}
              />
            )}
          </div>
          <div className={styles.price}>
            <p className={styles.digit}>{totalPriceState.totalPrice}</p>
            <CurrencyIcon />
          </div>
          {constructorList.bun && (
            <Button
              htmlType="button"
              type="primary"
              size="large"
              extraClass={styles.btn}
              onClick={handleOrderButtonClick}
            >
              Оформить заказ
            </Button>
          )}
          {!constructorList.bun && (
            <Button
              disabled={true}
              htmlType="button"
              type="primary"
              size="large"
              extraClass={styles.btn}
              onClick={handleOrderButtonClick}
            >
              Оформить заказ
            </Button>
          )}
        </section>
      )}
      {!order.isLoading && order.data && (
        <Modal closeModal={handleCloseModal}>
          <OrderDetails data={order.data} />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  ordersUrl: PropTypes.string.isRequired,
};

export default BurgerConstructor;
