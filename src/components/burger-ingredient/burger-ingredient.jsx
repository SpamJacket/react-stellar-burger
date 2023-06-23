import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

function BurgerIngredient({ data }) {
  return (
    <li className={styles.li}>
      <img className={styles.img} src={data.image} alt={data.name} />
      { data.__v !== 0 && <Counter count={data.__v} size="default" /> }
      <div className={styles.price}>
        <p className={styles.digit}>{data.price}</p>
        <CurrencyIcon />
      </div>
      <p className={styles.name}>{data.name}</p>
    </li>
  );
}

export default BurgerIngredient;