import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-ingredients.module.css";

import BurgerIngredient from "../burger-ingredient/burger-ingredient.jsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ data, openModal, modalComponent }) => {
  const [current, setCurrent] = React.useState('Buns');

  const renderIngredients = React.useCallback(type => {
    return data.map((ingredient, index) => {
      if(ingredient.type === type) {
        return <BurgerIngredient key={index} data={ingredient} openModal={openModal} modalComponent={modalComponent} />
      }
    });
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
          {renderIngredients('bun')}
        </ul>

        <h3 className={styles.title}>Соусы</h3>
        <ul className={styles.list}>
          {renderIngredients('sauce')}
        </ul>

        <h3 className={styles.title}>Начинки</h3>
        <ul className={styles.list}>
          {renderIngredients('main')}
        </ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  openModal: PropTypes.func.isRequired,
  modalComponent: PropTypes.object.isRequired
};

export default BurgerIngredients;