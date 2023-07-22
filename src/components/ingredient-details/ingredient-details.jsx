import PropTypes from "prop-types";

import styles from "./ingredient-details.module.css";

const IngredientDetails = ({ data }) => {
  return (
    <>
      <h4 className={styles.title}>Детали ингридиента</h4>
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
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }).isRequired,
};

export default IngredientDetails;
