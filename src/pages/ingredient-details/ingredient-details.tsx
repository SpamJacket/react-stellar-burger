import { FC } from "react";
import styles from "./ingredient-details.module.css";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const IngredientDetailsPage: FC = () => {
  return (
    <div className={styles.container}>
      <IngredientDetails />
    </div>
  );
};

export default IngredientDetailsPage;
