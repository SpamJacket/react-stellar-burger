import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./Modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modal");

const Modal = ({ children, closeModal, modalRef, overlayRef }) => {
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <ModalOverlay closeModal={closeModal} ref={overlayRef} />
      <div className={styles.container} ref={modalRef}>
        <button className={styles.closeButton}>
          <CloseIcon type="primary" onClick={closeModal} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
