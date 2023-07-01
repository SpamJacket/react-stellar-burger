import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-constructor.module.css";

import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerElement from "../burger-element/burger-element.jsx";

const BurgerConstructor = ({ data, openModal, modalComponent }) => {
  // Заменить! Это генератор номера заказа
  const handleOrderButtonClick = React.useCallback(() => {
    const orderId = ('000000' + Math.floor(Math.random() * 999999 + 1)).slice(-6);
    const data = {
      orderId,
      totalPrice
    };
    modalComponent.current = { type: 'order', data };
    openModal();
  });

  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    if(data.bun.price !== undefined) {
      setTotalPrice(totalPrice + (data.bun.price * 2));
    }
    data.filings.forEach(el => {
      setTotalPrice(prevState => (prevState + el.price));
    });
  }, [data])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ConstructorElement
          key={0}
          type="top"
          isLocked={true}
          text={data.bun.name + " (верх)"}
          price={data.bun.price}
          thumbnail={data.bun.image}
          extraClass={[styles.element_background_dark, styles.borderElement]}
        />
        <ul className={styles.list}>
          {data.filings.map((el, index) => <BurgerElement key={index + 2} data={el} />)}
        </ul>
        <ConstructorElement
          key={1}
          type="bottom"
          isLocked={true}
          text={data.bun.name  + " (низ)"}
          price={data.bun.price}
          thumbnail={data.bun.image}
          extraClass={[styles.element_background_dark, styles.borderElement]}
        />
      </div>
      <div className={styles.price}>
        <p className={styles.digit}>{totalPrice}</p>
        <CurrencyIcon />
      </div>
      <Button htmlType="button" type="primary" size="large" extraClass={styles.btn} onClick={handleOrderButtonClick}>Оформить заказ</Button>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.shape({bun: PropTypes.object.isRequired, filings: PropTypes.arrayOf(ingredientPropType).isRequired}).isRequired,
  openModal: PropTypes.func.isRequired,
  modalComponent: PropTypes.object.isRequired
};

export default BurgerConstructor;