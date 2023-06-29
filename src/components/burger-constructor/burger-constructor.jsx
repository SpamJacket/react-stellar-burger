import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import BurgerElement from "../burger-element/burger-element.jsx";
import { ingredientPropType } from "../../utils/prop-types.js";

const BurgerConstructor = ({ data, openModal, modalComponent }) => {
  const [totalPrice, setTotalPrice] = React.useState(0);

  const renderIngredients = () => {
    return data.map((ingredient, index) => {
      if(ingredient.type !== 'bun') {
        return <BurgerElement key={index} data={ingredient} />
      }
    });
  }

  const handleOrderButtonClick = () => {
    const orderId = Math.floor(Math.random() * 999999 + 1);
    const data = {
      orderId: ('000000' + orderId).slice(-6),
    };
    modalComponent.current = { type: 'order', data };
    openModal();
  };

  // Заменить! Это подсчет итоговой суммы
  React.useEffect(() => {
    let price = 0;
    document.querySelectorAll('.constructor-element__price').forEach(priceElement => {
      price += Number(priceElement.textContent);
    });
    setTotalPrice(price);
  });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={"Краторная булка N-200i" + " (верх)"}
          price={1255}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          extraClass={[styles.element_background_dark, styles.borderElement]}
        />
        <ul className={styles.list}>
          {/* {renderIngredients()} */}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={"Краторная булка N-200i"  + " (низ)"}
          price={1255}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
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

BurgerConstructor.propTypes = { data: PropTypes.arrayOf(ingredientPropType).isRequired };

export default BurgerConstructor;