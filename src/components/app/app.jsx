import PropTypes from "prop-types";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

const App = ({ endpoints }) => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <h2 className={styles.title}>Соберите бургер</h2>
        <BurgerIngredients />
        <BurgerConstructor ordersUrl={endpoints.ordersUrl} />
      </main>
    </div>
  );
};

App.propTypes = { endpoints: PropTypes.objectOf(PropTypes.string).isRequired };

export default App;
