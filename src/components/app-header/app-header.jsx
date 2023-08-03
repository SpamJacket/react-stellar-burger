import styles from "./app-header.module.css";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <button
          type="button"
          aria-label="Конструктор"
          className={styles.button}
        >
          <BurgerIcon type="primary" />
          <p className={styles.link}>Конструктор</p>
        </button>
        <button
          type="button"
          aria-label="Лента заказов"
          className={styles.button}
        >
          <ListIcon type="secondary" />
          <p className={styles.link_inactive}>Лента заказов</p>
        </button>
      </nav>
      <Logo />
      <nav className={styles.navBar}>
        <button
          type="button"
          aria-label="Личный кабинет"
          className={styles.button}
        >
          <ProfileIcon type="secondary" />
          <p className={styles.link_inactive}>Личный кабинет</p>
        </button>
      </nav>
    </header>
  );
};

export default AppHeader;
