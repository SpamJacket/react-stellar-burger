import { ingredientPropType } from "../../utils/prop-types.js";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

const BurgerIngredient = ({ data, counter, openModal, modalComponent }) => {
  const handleItemClick = () => {
    modalComponent.current = { type: 'ingredient', data };
    openModal();
  };

  return (
    <li className={styles.li} onClick={handleItemClick}>
      <img className={styles.img} src={data.image} alt={data.name} />
      {counter > 0 && <Counter count={0} size="default" />}
      <div className={styles.price}>
        <p className={styles.digit}>{data.price}</p>
        <CurrencyIcon />
      </div>
      <p className={styles.name}>{data.name}</p>
    </li>
  );
};

BurgerIngredient.propTypes = { data: ingredientPropType.isRequired };

export default BurgerIngredient;