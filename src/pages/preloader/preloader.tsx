import { FC } from "react";
import styles from "./preloader.module.css";

const Preloader: FC = () => {
  return (
    <div className={styles.preloader}>
      <h2 className={styles.title}>Идет загрузка данных, подождите</h2>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Preloader;
