import styles from './with-modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const withModal = ModalComponent => props => {
  return (
    <div className={styles.container}>
      <button className={styles.closeButton}><CloseIcon type='primary' onClick={props.closeModal} /></button>
      <ModalComponent {...props} />
    </div>
  );
};

export default withModal;