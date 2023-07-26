import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-ingredients.module.css";

import BurgerIngredient from "../burger-ingredient/burger-ingredient.jsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("Buns");

  const renderIngredients = (type) => {
    return data.map((ingredient, index) => {
      if (ingredient.type === type) {
        return <BurgerIngredient key={index} data={ingredient} />;
      }
    });
  };

  const bunsHeaderRef = React.useRef();
  const saucesHeaderRef = React.useRef();
  const mainsHeaderRef = React.useRef();

  const scrollIntoTitle = (tab) => {
    setCurrent(tab);
    if (tab === "Buns") {
      bunsHeaderRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "Sauces") {
      saucesHeaderRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      mainsHeaderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.tabs}>
        <Tab value="Buns" active={current === "Buns"} onClick={scrollIntoTitle}>
          Булки
        </Tab>
        <Tab
          value="Sauces"
          active={current === "Sauces"}
          onClick={scrollIntoTitle}
        >
          Соусы
        </Tab>
        <Tab
          value="Mains"
          active={current === "Mains"}
          onClick={scrollIntoTitle}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients}>
        <h3 className={styles.title} ref={bunsHeaderRef}>
          Булки
        </h3>
        <ul className={styles.list}>{renderIngredients("bun")}</ul>

        <h3 className={styles.title} ref={saucesHeaderRef}>
          Соусы
        </h3>
        <ul className={styles.list}>{renderIngredients("sauce")}</ul>

        <h3 className={styles.title} ref={mainsHeaderRef}>
          Начинки
        </h3>
        <ul className={styles.list}>{renderIngredients("main")}</ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;
