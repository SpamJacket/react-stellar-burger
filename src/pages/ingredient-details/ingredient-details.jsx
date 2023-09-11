import styles from "./ingredient-details.module.css";

import IngredientDetails from "../../components/ingredient-details/ingredient-details.jsx";

const IngredientDetailsPage = () => {
  return (
    <div className={styles.container}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientDetailsPage;
