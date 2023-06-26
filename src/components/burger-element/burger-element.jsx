import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-element.module.css";

function BurgerElement(data) {
  return (
    <li className={styles.item}>
      <DragIcon />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.img}
        extraClass={[styles.element_background_dark, styles.element]}
      />
    </li>
  );
}

export default BurgerElement;