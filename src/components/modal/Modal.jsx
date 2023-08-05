import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./Modal.module.css";

import ModalOverlay from "../modal-overlay/modal-overlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modal");

const Modal = ({ children, closeModal }) => {
  const modalRef = React.useRef();
  const overlayRef = React.useRef();

  const animateClosing = () => {
    modalRef.current.style = "opacity: 0";
    setTimeout(() => {
      overlayRef.current.style = "opacity: 0";
    }, 100);
    setTimeout(closeModal, 300);
  };

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      animateClosing();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      overlayRef.current.style = "opacity: 1";
      modalRef.current.style = "opacity: 1";
    }, 0);
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <ModalOverlay closeModal={animateClosing} ref={overlayRef} />
      <div className={styles.container} ref={modalRef}>
        <button className={styles.closeButton}>
          <CloseIcon type="primary" onClick={animateClosing} />
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
