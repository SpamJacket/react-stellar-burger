import React from "react";

import styles from "./burger-ingredients.module.css";

import BurgerIngredient from "../burger-ingredient/burger-ingredient.jsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients.js";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredientsList
  );

  const [current, setCurrent] = React.useState("Buns");

  const bunsHeaderRef = React.useRef();
  const saucesHeaderRef = React.useRef();
  const mainsHeaderRef = React.useRef();

  const scrollIntoTitle = React.useCallback(
    (tab) => {
      setCurrent(tab);
      if (tab === "Buns") {
        bunsHeaderRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (tab === "Sauces") {
        saucesHeaderRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        mainsHeaderRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [setCurrent]
  );

  const { bun, filings } = useSelector((store) => store.constructorList);

  const ingredientsId = React.useMemo(() => {
    const ingredients = {};
    if (bun) {
      ingredients[bun._id] = 2;
    }
    filings.forEach((filing) => {
      if (ingredients.hasOwnProperty(filing._id)) {
        ingredients[filing._id]++;
      } else {
        ingredients[filing._id] = 1;
      }
    });
    return ingredients;
  }, [bun, filings]);

  const renderIngredients = React.useCallback(
    (type) => {
      return ingredients.map((ingredient, index) => {
        if (ingredient.type === type) {
          if (ingredientsId.hasOwnProperty(ingredient._id)) {
            return (
              <BurgerIngredient
                key={index}
                ingredientData={ingredient}
                counter={ingredientsId[ingredient._id]}
              />
            );
          } else {
            return (
              <BurgerIngredient
                key={index}
                ingredientData={ingredient}
                counter={0}
              />
            );
          }
        }
      });
    },
    [ingredients, bun, filings]
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
  }, [ingredients, ingredientsRequest, renderIngredients]);

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
        {ingredientsFailed && (
          <h2 className={styles.errorTitle}>
            Произошла ошибка! Перезагрузите страницу
          </h2>
        )}
        {!ingredientsFailed && content}
      </div>
    </section>
  );
};

export default BurgerIngredients;
