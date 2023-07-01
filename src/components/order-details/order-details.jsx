import PropTypes from 'prop-types';

import styles from './order-details.module.css';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { orderAcceptBackground } from '../../utils/constants.js';

const OrderDitails = ({ data }) => {
  return (
    <>
      <h4 className={styles.title}>{data.orderId}</h4>
      <h5 className={styles.subtitle}>идентификатор заказа</h5>
      {/* Не нашел другой сбособ взять фон для галочки */}
      <div className={styles.icon}>
        <CheckMarkIcon type="primary" />
        {orderAcceptBackground}
      </div>
      <p className={styles.description}>Ваш заказ начали готовить</p>
      <p className={styles.waitInfo}>Дождитесь готовности на орбитальной станции</p>
    </>
  );
};

OrderDitails.propTypes = {
  data: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired
  }).isRequired
};

export default OrderDitails;