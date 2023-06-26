import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient.jsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { ingredientPropType } from "../../utils/prop-types.js";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('Buns');

  const buns = [];
  const sauces = [];
  const mains = [];

  props.data.forEach(ingredient => {
    if(ingredient.type === "bun") {
      buns.push(ingredient);
    } else if(ingredient.type === "sauce") {
      sauces.push(ingredient);
    } else {
      mains.push(ingredient);
    }
  });

  return (
    <section className={styles.section}>
      <div style={{ display: 'flex' }}>
        <Tab value="Buns" active={current === 'Buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Sauces" active={current === 'Sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Mains" active={current === 'Mains'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients}>
        <h3 className={styles.title}>Булки</h3>
        <ul className={styles.list}>
          {
            buns.map((bun, index) => (
              <BurgerIngredient key={index} data={bun} />
            ))
          }
        </ul>

        <h3 className={styles.title}>Соусы</h3>
        <ul className={styles.list}>
          {
            sauces.map((sauce, index) => (
              <BurgerIngredient key={index} data={sauce} />
            ))
          }
        </ul>

        <h3 className={styles.title}>Начинки</h3>
        <ul className={styles.list}>
          {
            mains.map((main, index) => (
              <BurgerIngredient key={index} data={main} />
            ))
          }
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = { data: PropTypes.arrayOf(ingredientPropType) };

export default BurgerIngredients;