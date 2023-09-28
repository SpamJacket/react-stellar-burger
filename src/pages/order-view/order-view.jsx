import styles from "./order-view.module.css";

import OrderView from "../../components/order-view/order-view";

const OrderViewPage = () => {
  return (
    <div className={styles.container}>
      <OrderView isPage={true} />
    </div>
  );
};

export default OrderViewPage;
