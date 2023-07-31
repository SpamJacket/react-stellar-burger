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

import { useSelector, useDispatch } from "react-redux";

import { cleanConstructorList } from "../../services/actions/burger-constructor.js";

import { sendOrderData } from "../../utils/api.js";

const BurgerConstructor = ({ ordersUrl }) => {
  const dispatch = useDispatch();

  const { bun, filings } = useSelector((store) => store.constructorList);

  const [order, setOrder] = React.useState({
    data: null,
    isLoading: false,
  });

  const totalPrice = React.useMemo(() => {
    let price = 0;
    if (bun) {
      price += bun.price * 2;
    }
    return filings.reduce((currentPrice, filing) => {
      return currentPrice + filing.price;
    }, price);
  }, [bun, filings]);

  const handleOrderButtonClick = React.useCallback(() => {
    const ingredientsId = [bun._id];
    filings.forEach((filing) => ingredientsId.push(filing._id));
    sendOrderData(ordersUrl, setOrder, ingredientsId)
      .then((res) => {
        setOrder({
          data: {
            name: res.name,
            orderId: ("000000" + res.order.number).slice(-6),
            price: totalPrice,
          },
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
    dispatch(cleanConstructorList());
  }, [bun, filings, ordersUrl, setOrder]);

  const handleCloseModal = React.useCallback(() => {
    setOrder({
      data: null,
      isLoading: false,
    });
  }, [setOrder]);

  return (
    <section className={styles.section}>
      {!order.isLoading && (
        <>
          <div className={styles.container}>
            {bun && (
              <ConstructorElement
                key={bun.constructorId}
                type="top"
                isLocked={true}
                text={bun.name + " (верх)"}
                price={bun.price}
                thumbnail={bun.image}
                extraClass={[
                  styles.element_background_dark,
                  styles.borderElement,
                ]}
              />
            )}
            <ul className={styles.list}>
              {filings.map((filing) => (
                <BurgerElement key={filing.constructorId} filing={filing} />
              ))}
            </ul>
            {bun && (
              <ConstructorElement
                key={bun.constructorId + 1}
                type="bottom"
                isLocked={true}
                text={bun.name + " (низ)"}
                price={bun.price}
                thumbnail={bun.image}
                extraClass={[
                  styles.element_background_dark,
                  styles.borderElement,
                ]}
              />
            )}
          </div>
          <div className={styles.price}>
            <p className={styles.digit}>{totalPrice}</p>
            <CurrencyIcon />
          </div>
          {bun && (
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
          {!bun && (
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
        </>
      )}
      {order.isLoading && (
        <h2 className={styles.loadingTitle}>
          Идет оформление заказа, подождите
        </h2>
      )}
      {!order.isLoading && order.data && (
        <Modal closeModal={handleCloseModal}>
          <OrderDetails data={order.data} />
        </Modal>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  ordersUrl: PropTypes.string.isRequired,
};

export default BurgerConstructor;
