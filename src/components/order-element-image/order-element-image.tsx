import { FC } from "react";
import styles from "./order-element-image.module.css";

const OrderElementImage: FC<{
  index: number;
  orderLength: number;
  image: string;
  name: string;
}> = ({ index, orderLength, image, name }) => {
  return (
    <div
      className={
        index === 5 && orderLength > 6
          ? styles.lastImageContainer
          : styles.imageContainer
      }
      style={{
        translate: `calc(-16px * ${index})`,
        zIndex: `${5 - index}`,
      }}
    >
      <img
        className={
          index === 5 && orderLength > 6 ? styles.lastImage : styles.image
        }
        src={image}
        alt={name}
      />
      {index === 5 && orderLength > 6 && (
        <p className={styles.extra}>{`+${orderLength - 6}`}</p>
      )}
    </div>
  );
};

export default OrderElementImage;
