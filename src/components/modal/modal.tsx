import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";

import ModalOverlay from "../modal-overlay/modal-overlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modal") as HTMLElement;

const Modal: FC<{ children: ReactNode; closeModal: Function }> = ({
  children,
  closeModal,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const animateClosing = React.useCallback(() => {
    if (modalRef.current && overlayRef.current) {
      modalRef.current.style.cssText = "opacity: 0";
      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.cssText = "opacity: 0";
        }
      }, 100);
      setTimeout(closeModal, 300);
    }
  }, [modalRef, overlayRef, closeModal]);

  const handleEscClose = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        animateClosing();
      }
    },
    [animateClosing]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [handleEscClose]);

  React.useEffect(() => {
    setTimeout(() => {
      if (modalRef.current && overlayRef.current) {
        overlayRef.current.style.cssText = "opacity: 1";
        modalRef.current.style.cssText = "opacity: 1";
      }
    }, 0);
  }, [overlayRef, modalRef]);

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

export default Modal;
