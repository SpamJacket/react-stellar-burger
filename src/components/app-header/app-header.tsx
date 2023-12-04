import { FC } from "react";
import { NavLink, useMatch, useNavigate } from "react-router-dom";

import styles from "./app-header.module.css";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader: FC = () => {
  const navigate = useNavigate();
  const isConstructor = useMatch("/react-stellar-burger/");
  const isOrdersList = useMatch("/react-stellar-burger/feed/*");
  const isProfile = useMatch("/react-stellar-burger/profile/*");

  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <NavLink
          to={"/react-stellar-burger/"}
          type="button"
          aria-label="Конструктор"
          className={({ isActive }) =>
            isActive ? styles.link : styles.inactiveLink
          }
        >
          <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
          <p className={styles.text}>Конструктор</p>
        </NavLink>
        <NavLink
          to={"/react-stellar-burger/feed"}
          type="button"
          aria-label="Лента заказов"
          className={({ isActive }) =>
            isActive ? styles.link : styles.inactiveLink
          }
        >
          <ListIcon type={isOrdersList ? "primary" : "secondary"} />
          <p className={styles.text}>Лента заказов</p>
        </NavLink>
      </nav>
      <div
        className={styles.logo}
        onClick={() => navigate("/react-stellar-burger/")}
      >
        <Logo />
      </div>
      <nav className={styles.navBar}>
        <NavLink
          to={"/react-stellar-burger/profile"}
          type="button"
          aria-label="Личный кабинет"
          className={({ isActive }) =>
            isActive ? styles.link : styles.inactiveLink
          }
        >
          <ProfileIcon type={isProfile ? "primary" : "secondary"} />
          <p className={styles.text}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
