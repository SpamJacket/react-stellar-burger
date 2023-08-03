import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import { cleanConstructorList } from "../../services/actions/burger-constructor.js";
import { placeOrder } from "../../services/actions/order-details.js";

import styles from "./burger-constructor.module.css";

import Modal from "../modal/Modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import BurgerElement from "../burger-element/burger-element.jsx";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ onDropHandler }) => {
  const dispatch = useDispatch();

  const { bun, filings } = useSelector((store) => store.constructorList);

  const { orderRequest, orderFailed } = useSelector(
    (store) => store.orderDetails
  );

  const [{}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  const [isModalOpened, setIsModalOpened] = React.useState(false);

  const handleOrderButtonClick = React.useCallback(() => {
    const ingredientsId = [bun._id];
    filings.forEach((filing) => ingredientsId.push(filing._id));
    dispatch(placeOrder(ingredientsId));
    setIsModalOpened(true);
    dispatch(cleanConstructorList());
  }, [bun, filings]);

  const handleCloseModal = React.useCallback(() => {
    setIsModalOpened(false);
  }, [setIsModalOpened]);

  const totalPrice = React.useMemo(() => {
    let price = 0;
    if (bun) {
      price += bun.price * 2;
    }
    return filings.reduce((currentPrice, filing) => {
      return currentPrice + filing.price;
    }, price);
  }, [bun, filings]);

  const content = React.useMemo(() => {
    return orderRequest ? (
      <h2 className={styles.loadingTitle}>Идет оформление заказа, подождите</h2>
    ) : (
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
        {isModalOpened && (
          <Modal closeModal={handleCloseModal}>
            <OrderDetails />
          </Modal>
        )}
      </>
    );
  }, [
    orderRequest,
    isModalOpened,
    bun,
    filings,
    handleOrderButtonClick,
    handleCloseModal,
  ]);

  return (
    <section ref={dropTarget} className={styles.section}>
      {orderFailed && (
        <h2 className={styles.errorTitle}>
          Произошла ошибка! Перезагрузите страницу
        </h2>
      )}
      {!orderFailed && content}
    </section>
  );
};

export default BurgerConstructor;
