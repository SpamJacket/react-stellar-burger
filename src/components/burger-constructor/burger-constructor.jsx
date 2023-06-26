import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import BurgerElement from "../burger-element/burger-element.jsx";
import { ingredientPropType } from "../../utils/prop-types.js";

function BurgerConstructor(props) {
  let bun = {};
  props.data.forEach(obj => {
    if(obj.type === 'bun' && obj.__v > 0) {
      bun = obj;
    }
  });

  const [totalPrice, setTotalPrice] = React.useState(0);

  function renderBun(bun, position){
    if(position === 'top') {
      return (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={[styles.element_background_dark, styles.borderElement]}
        />
      );
    } else {
      return (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name  + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={[styles.element_background_dark, styles.borderElement]}
        />
      );
    }
  }
  
  function renderIngridients(data) {
    let index = -1;
    const array = [];
  
    data.forEach(obj => {
      if(obj.type !== 'bun' && obj.__v > 0) {
        for(let i = 0; i < obj.__v; i++) {
          index += 1;
          array.push((<BurgerElement key={index} name={obj.name} price={obj.price} img={obj.image} />));
        }
      }
    });
  
    return array;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {renderBun(bun, 'top')}
        <ul className={styles.list}>
          {renderIngridients(props.data)}
        </ul>
        {renderBun(bun, 'bottom')}
      </div>
      <div className={styles.price}>
        <p className={styles.digit}>{totalPrice}</p>
        <CurrencyIcon />
      </div>
      <Button htmlType="button" type="primary" size="large" extraClass={styles.btn}>Оформить заказ</Button>
    </section>
  );
}

BurgerConstructor.propTypes = { data: PropTypes.arrayOf(ingredientPropType) };

export default BurgerConstructor;