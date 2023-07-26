import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./ingredient-details.module.css";

const IngredientDetails = ({ data }) => {
  return (
    <>
      <h4 className={styles.title}>Детали ингредиента</h4>
      <img className={styles.image} src={data.image} alt={data.name} />
      <p className={styles.name}>{data.name}</p>
      <div className={styles.nutrients}>
        <p className={styles.nutrient}>
          Калории, ккал<span className={styles.quantity}>{data.calories}</span>
        </p>
        <p className={styles.nutrient}>
          Белки, г<span className={styles.quantity}>{data.proteins}</span>
        </p>
        <p className={styles.nutrient}>
          Жиры, г<span className={styles.quantity}>{data.fat}</span>
        </p>
        <p className={styles.nutrient}>
          Углеводы, г
          <span className={styles.quantity}>{data.carbohydrates}</span>
        </p>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  data: ingredientPropType.isRequired,
};

export default IngredientDetails;
