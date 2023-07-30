import React from "react";

import styles from "./burger-ingredients.module.css";

import BurgerIngredient from "../burger-ingredient/burger-ingredient.jsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const { data, dataRequest, dataFailed } = useSelector(
    (store) => store.ingredients
  );

  const [current, setCurrent] = React.useState("Buns");

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

  const content = React.useMemo(() => {
    return dataRequest ? (
      <h2 className={styles.loadingTitle}>
        Подождите, идет загрузка ингредиентов
      </h2>
    ) : (
      <>
        <h3 className={styles.title} ref={bunsHeaderRef}>
          Булки
        </h3>
        <ul className={styles.list}>
          {data.map((ingredient, index) => {
            if (ingredient.type === "bun") {
              return <BurgerIngredient key={index} data={ingredient} />;
            }
          })}
        </ul>

        <h3 className={styles.title} ref={saucesHeaderRef}>
          Соусы
        </h3>
        <ul className={styles.list}>
          {data.map((ingredient, index) => {
            if (ingredient.type === "sauce") {
              return <BurgerIngredient key={index} data={ingredient} />;
            }
          })}
        </ul>

        <h3 className={styles.title} ref={mainsHeaderRef}>
          Начинки
        </h3>
        <ul className={styles.list}>
          {data.map((ingredient, index) => {
            if (ingredient.type === "main") {
              return <BurgerIngredient key={index} data={ingredient} />;
            }
          })}
        </ul>
      </>
    );
  }, [data, dataRequest]);

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
        {dataFailed && (
          <h2 className={styles.errorTitle}>
            Произошла ошибка! Перезагрузите страницу
          </h2>
        )}
        {!dataFailed && content}
      </div>
    </section>
  );
};

export default BurgerIngredients;
