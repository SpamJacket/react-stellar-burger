import { ingredientPropType } from "../../utils/prop-types.js";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

const BurgerIngredient = ({ data }) => {
  return (
    <li className={styles.li}>
      <img className={styles.img} src={data.image} alt={data.name} />
      <Counter count={0} size="default" />
      <div className={styles.price}>
        <p className={styles.digit}>{data.price}</p>
        <CurrencyIcon />
      </div>
      <p className={styles.name}>{data.name}</p>
    </li>
  );
}

BurgerIngredient.propTypes = { data: ingredientPropType.isRequired };

export default BurgerIngredient;