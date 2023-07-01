import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import styles from "./modal-overlay.module.css";

import withModal from "../hocs/with-modal/with-modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderDitails from "../order-details/order-details.jsx";

const WithModalIngredientDetails = withModal(IngredientDetails);
const WithModalOrderDetails = withModal(OrderDitails);

const modalRoot = document.getElementById('react-modal');

const ModalOverlay = ({ closeModal, modalComponent }) => {
  const handleCloseButtonClick = React.useCallback((e) => {
    if(e.target === e.currentTarget) {
      closeModal();
    }
  });

  return ReactDOM.createPortal((
    <div className={styles.overlay} onClick={handleCloseButtonClick}>
      {modalComponent.current.type === 'ingredient' && <WithModalIngredientDetails closeModal={closeModal} data={modalComponent.current.ingredient} />}
      {modalComponent.current.type === 'order' && <WithModalOrderDetails closeModal={closeModal} data={modalComponent.current.data} />}
    </div>
  ), modalRoot);
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalComponent: PropTypes.object.isRequired
};

WithModalIngredientDetails.propTypes = {
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
  }).isRequired
};

WithModalOrderDetails.propTypes = {
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired
  }).isRequired
};

export default ModalOverlay;