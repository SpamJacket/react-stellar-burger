import { useSelector } from "../../services/hooks/hooks";
import { useParams } from "react-router-dom";

import styles from "./ingredient-details.module.css";

const IngredientDetails = () => {
  const { ingredients } = useSelector((store) => store.ingredientsList);
  const { ingredientId } = useParams();
  const ingredient = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );

  return (
    <>
      {ingredient && (
        <>
          <h4 className={styles.title}>Детали ингредиента</h4>
          <img
            className={styles.image}
            src={ingredient.image}
            alt={ingredient.name}
          />
          <p className={styles.name}>{ingredient.name}</p>
          <div className={styles.nutrients}>
            <p className={styles.nutrient}>
              Калории, ккал
              <span className={styles.quantity}>{ingredient.calories}</span>
            </p>
            <p className={styles.nutrient}>
              Белки, г
              <span className={styles.quantity}>{ingredient.proteins}</span>
            </p>
            <p className={styles.nutrient}>
              Жиры, г<span className={styles.quantity}>{ingredient.fat}</span>
            </p>
            <p className={styles.nutrient}>
              Углеводы, г
              <span className={styles.quantity}>
                {ingredient.carbohydrates}
              </span>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default IngredientDetails;
