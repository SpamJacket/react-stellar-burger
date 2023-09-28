import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import styles from "./burger-constructor.module.css";

import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import BurgerElement from "../burger-element/burger-element.jsx";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  addToConstructorList,
  setFilings,
} from "../../services/actions/burger-constructor.js";
import { placeOrder } from "../../services/actions/order-details.js";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.user);
  const { bun, filings } = useSelector((store) => store.constructorList);

  const { orderRequest, orderFailed } = useSelector(
    (store) => store.orderDetails
  );

  const [{}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addToConstructorList(item));
    },
  });

  const sortIngredients = React.useCallback(
    (fromIndex, toIndex) => {
      const dragFiling = filings[fromIndex];
      const newFilings = [...filings];
      newFilings.splice(fromIndex, 1);
      newFilings.splice(toIndex, 0, dragFiling);
      dispatch(setFilings(newFilings));
    },
    [dispatch, filings]
  );

  const [isModalOpened, setIsModalOpened] = React.useState(false);

  const handleOrderButtonClick = () => {
    if (user) {
      const ingredientsId = [bun._id];
      filings.forEach((filing) => ingredientsId.push(filing._id));
      dispatch(placeOrder(ingredientsId, setIsModalOpened));
    } else {
      navigate("/login");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

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
              <BurgerElement
                key={filing.constructorId}
                filing={filing}
                sortIngredients={sortIngredients}
              />
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
        <Button
          disabled={bun ? false : true}
          htmlType="button"
          type="primary"
          size="large"
          extraClass={styles.btn}
          onClick={handleOrderButtonClick}
        >
          Оформить заказ
        </Button>
        {isModalOpened && (
          <Modal closeModal={handleCloseModal}>
            <OrderDetails />
          </Modal>
        )}
      </>
    );
  }, [orderRequest, isModalOpened, bun, filings, sortIngredients]);

  return (
    <section ref={dropTarget} className={styles.section}>
      {orderFailed ? (
        <h2 className={styles.errorTitle}>
          Произошла ошибка! Перезагрузите страницу
        </h2>
      ) : (
        content
      )}
    </section>
  );
};

export default BurgerConstructor;
