import React from "react";

import OrderElement from "../../components/order-element/order-element";

import styles from "./orders-list.module.css";

const OrdersList = ({ privateList }) => {
  return (
    <>
      {privateList ? (
        <ul className={styles.privateList}>
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
        </ul>
      ) : (
        <ul className={styles.list}>
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
          <OrderElement privateList={privateList} />
        </ul>
      )}
    </>
  );
};

OrdersList.defaultProps = {
  privateList: false,
};

export default OrdersList;
