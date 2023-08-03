import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useDispatch } from "react-redux";

import { addToConstructorList } from "../../services/actions/burger-constructor.js";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

const App = () => {
  const dispatch = useDispatch();

  const handleDrop = (ingredient) => {
    dispatch(addToConstructorList(ingredient));
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <h2 className={styles.title}>Соберите бургер</h2>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onDropHandler={handleDrop} />
        </DndProvider>
      </main>
    </div>
  );
};

export default App;
