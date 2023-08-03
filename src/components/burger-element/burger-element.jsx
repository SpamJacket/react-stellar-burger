import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { deleteFromConstructorList } from "../../services/actions/burger-constructor.js";

import { ingredientPropType } from "../../utils/prop-types.js";

import styles from "./burger-element.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerElement = ({ filing, sortIngredients }) => {
  const dispatch = useDispatch();
  const { filings } = useSelector((store) => store.constructorList);

  const dragDropRef = React.useRef(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: "sortedIngredient",
    item: {
      id: filing.constructorId,
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropTarget] = useDrop({
    accept: "sortedIngredient",
    hover(item) {
      const dragIndex = filings.findIndex((el) => el.constructorId === item.id);
      const hoverIndex = filings.findIndex(
        (el) => el.constructorId === filing.constructorId
      );

      sortIngredients(dragIndex, hoverIndex);
    },
  });

  const opacity = isDrag ? 0 : 1;

  dragRef(dropTarget(dragDropRef));

  const handleDeleteIngredientClick = React.useCallback(() => {
    dispatch(deleteFromConstructorList(filing.constructorId));
  }, [dispatch, filing]);

  return (
    <li ref={dragDropRef} className={styles.item} style={{ opacity }}>
      <button
        type="button"
        aria-label="Значок перетаскивания"
        className={styles.dragIcon}
      >
        <DragIcon />
      </button>
      <ConstructorElement
        text={filing.name}
        price={filing.price}
        thumbnail={filing.image}
        extraClass={[styles.element_background_dark, styles.element]}
        handleClose={handleDeleteIngredientClick}
      />
    </li>
  );
};

BurgerElement.propTypes = {
  filing: ingredientPropType.isRequired,
  sortIngredients: PropTypes.func.isRequired,
};

export default BurgerElement;
