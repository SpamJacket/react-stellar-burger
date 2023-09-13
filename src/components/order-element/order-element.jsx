import React from "react";
import { Link, useLocation, useMatch } from "react-router-dom";

import styles from "./order-element.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const imagesArray = [
  "https://code.s3.yandex.net/react/code/bun-01.png",
  "https://code.s3.yandex.net/react/code/bun-01.png",
  "https://code.s3.yandex.net/react/code/bun-01.png",
  "https://code.s3.yandex.net/react/code/bun-01.png",
  "https://code.s3.yandex.net/react/code/bun-01.png",
  "https://code.s3.yandex.net/react/code/bun-01.png",
  "https://code.s3.yandex.net/react/code/bun-01.png",
  "https://code.s3.yandex.net/react/code/bun-01.png",
  "https://code.s3.yandex.net/react/code/bun-01.png",
];

const OrderElement = ({ privateList }) => {
  const location = useLocation();

  const images = React.useMemo(() => {
    return imagesArray.map((imageUrl, index) => {
      return index < 6 ? (
        index === 5 ? (
          <div
            key={index}
            className={styles.lastImageContainer}
            style={{
              translate: `calc(-16px * ${index})`,
              zIndex: `${imagesArray.length - index - 1}`,
            }}
          >
            <img
              className={styles.lastImage}
              src={imageUrl}
              alt="Флюоресцентная булка R2-D3"
            />
            <p className={styles.extra}>{`+${imagesArray.length - 6}`}</p>
          </div>
        ) : (
          <div
            key={index}
            className={styles.imageContainer}
            style={{
              translate: `calc(-16px * ${index})`,
              zIndex: `${imagesArray.length - index - 1}`,
            }}
          >
            <img
              className={styles.image}
              src={imageUrl}
              alt="Флюоресцентная булка R2-D3"
            />
          </div>
        )
      ) : null;
    });
  });

  return (
    <Link
      to={
        location.pathname === "/feed"
          ? `/feed/${123456}`
          : `/profile/orders/${123456}`
      }
      state={{ previousPage: location }}
      className={styles.link}
    >
      {privateList ? (
        <li className={styles.privateOrder}>
          <div className={styles.title}>
            <h4 className={styles.number}>#123456</h4>
            <p className={styles.time}>Сегодня, 16:20 i-GMT+3</p>
          </div>
          <h3 className={styles.name}>Death Star Starship Main бургер</h3>
          <p className={styles.status}>Создан</p>
          <div className={styles.images}>{images}</div>
          <p className={styles.price}>
            <span className={styles.cost}>480</span>
            <CurrencyIcon type="primary" />
          </p>
        </li>
      ) : (
        <li className={styles.order}>
          <div className={styles.title}>
            <h4 className={styles.number}>#123456</h4>
            <p className={styles.time}>Сегодня, 16:20 i-GMT+3</p>
          </div>
          <h3 className={styles.name}>Death Star Starship Main бургер</h3>
          <div className={styles.images}>{images}</div>
          <p className={styles.price}>
            <span className={styles.cost}>480</span>
            <CurrencyIcon type="primary" />
          </p>
        </li>
      )}
    </Link>
  );
};

export default OrderElement;
