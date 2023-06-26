import { ingredientPropType } from "../../utils/prop-types.js";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-element.module.css";

function BurgerElement({ data }) {
  return (
    <li className={styles.item}>
      <DragIcon />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        extraClass={[styles.element_background_dark, styles.element]}
      />
    </li>
  );
}

BurgerElement.propTypes = { data: ingredientPropType.isRequired };

export default BurgerElement;