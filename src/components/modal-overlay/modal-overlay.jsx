import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";

import withModal from "../hocs/with-modal/with-modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderDitails from "../order-details/order-details.jsx";

const WithModalIngredientDetails = withModal(IngredientDetails);
const WithModalOrderDetails = withModal(OrderDitails);

const modalRoot = document.getElementById('react-modal');

const ModalOverlay = ({ closeModal, modalComponent }) => {
  const handleCloseButtonClick = (e) => {
    if(e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal((
    <div className={styles.overlay} onClick={handleCloseButtonClick}>
      {modalComponent.current.type === 'ingredient' && <WithModalIngredientDetails closeModal={closeModal} data={modalComponent.current.data} />}
      {modalComponent.current.type === 'order' && <WithModalOrderDetails closeModal={closeModal} data={modalComponent.current.data} />}
    </div>
  ), modalRoot);
};

export default ModalOverlay;