import React from "react";
import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

const ModalOverlay = React.forwardRef(({ closeModal }, overlayRef) => {
  const handleOverlayClick = React.useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      ref={overlayRef}
    />
  );
});

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
