import React, { MouseEvent } from "react";

import styles from "./modal-overlay.module.css";

const ModalOverlay = React.forwardRef<HTMLDivElement, { closeModal: Function }>(
  ({ closeModal }, overlayRef) => {
    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    };

    return (
      <div
        className={styles.overlay}
        onClick={handleOverlayClick}
        ref={overlayRef}
      />
    );
  }
);

export default ModalOverlay;
