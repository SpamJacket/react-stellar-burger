import PropTypes from "prop-types";

import styles from "./order-element-image.module.css";

const OrderElementImage = ({ index, orderLength, image, name }) => {
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

OrderElementImage.propTypes = {
  index: PropTypes.number.isRequired,
  orderLength: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default OrderElementImage;
