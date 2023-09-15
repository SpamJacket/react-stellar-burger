import React from "react";
import { useSelector } from "react-redux";

import styles from "./burger-ingredients.module.css";

import BurgerIngredient from "../burger-ingredient/burger-ingredient.jsx";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredientsList
  );

  const { bun, filings } = useSelector((store) => store.constructorList);

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

  const updateTab = () => {
    const bunsRect = bunsHeaderRef.current.getBoundingClientRect();
    const saucesRect = saucesHeaderRef.current.getBoundingClientRect();
    const mainsRect = mainsHeaderRef.current.getBoundingClientRect();

    if (mainsRect.top < 400) {
      setCurrent("Mains");
    } else if (saucesRect.top < 400) {
      setCurrent("Sauces");
    } else if (bunsRect.top < 400) {
      setCurrent("Buns");
    }
  };

  const ingredientsId = React.useMemo(() => {
    const ingredients = {};
    if (bun) {
      ingredients[bun._id] = 2;
    }
    filings.forEach((filing) => {
      if (ingredients[filing._id]) {
        ingredients[filing._id] += 1;
      } else {
        ingredients[filing._id] = 1;
      }
    });
    return ingredients;
  }, [bun, filings]);

  const renderIngredients = React.useCallback(
    (type) => {
      return ingredients.map((ingredient) => {
        if (ingredient.type === type) {
          return (
            <BurgerIngredient
              key={ingredient._id}
              ingredientData={ingredient}
              counter={ingredientsId[ingredient._id] ?? 0}
            />
          );
        }
      });
    },
    [ingredients, ingredientsId]
  );

  const content = React.useMemo(() => {
    return ingredientsRequest ? (
      <h2 className={styles.loadingTitle}>
        Подождите, идет загрузка ингредиентов
      </h2>
    ) : (
      <>
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
      </>
    );
  }, [ingredientsRequest, renderIngredients]);

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
      <div onScroll={updateTab} className={styles.ingredients}>
        {ingredientsFailed ? (
          <h2 className={styles.errorTitle}>
            Произошла ошибка! Перезагрузите страницу
          </h2>
        ) : (
          content
        )}
      </div>
    </section>
  );
};

export default BurgerIngredients;
