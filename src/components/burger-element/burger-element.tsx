import React, { FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import { useDrag, useDrop } from "react-dnd";

import styles from "./burger-element.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { deleteFromConstructorList } from "../../services/actions/burger-constructor";
import { TIngredientWithUuid } from "../../utils/types";

const BurgerElement: FC<{
  filing: TIngredientWithUuid;
  sortIngredients: Function;
}> = React.memo(({ filing, sortIngredients }) => {
  const dispatch = useDispatch();

  const { filings } = useSelector((store) => store.constructorList);

  const dragDropRef = React.useRef<HTMLLIElement>(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: "sortedIngredient",
    item: {
      id: filing.constructorId,
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropTarget] = useDrop<{ id: string }>({
    accept: "sortedIngredient",
    hover(item) {
      const dragIndex: number = filings.findIndex(
        (el) => el.constructorId === item.id
      );
      const hoverIndex: number = filings.findIndex(
        (el) => el.constructorId === filing.constructorId
      );

      sortIngredients(dragIndex, hoverIndex);
    },
  });

  const opacity: number = isDrag ? 0 : 1;

  dragRef(dropTarget(dragDropRef));

  const handleDeleteIngredientClick = (): void => {
    dispatch(deleteFromConstructorList(filing.constructorId));
  };

  return (
    <li ref={dragDropRef} className={styles.item} style={{ opacity }}>
      <button
        type="button"
        aria-label="Значок перетаскивания"
        className={styles.dragIcon}
      >
        <DragIcon type={"primary"} />
      </button>
      <ConstructorElement
        text={filing.name}
        price={filing.price}
        thumbnail={filing.image}
        extraClass={styles.element_background_dark + " " + styles.element}
        handleClose={handleDeleteIngredientClick}
      />
    </li>
  );
});

export default BurgerElement;