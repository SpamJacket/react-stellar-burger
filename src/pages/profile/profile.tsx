import { FC, MouseEvent } from "react";
import { useDispatch } from "../../services/hooks/hooks";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./profile.module.css";

import { logoutUser } from "../../services/actionCreators/user";

const Profile: FC = () => {
  const dispatch = useDispatch();

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div className={styles.container}>
      <nav className={styles.links}>
        <NavLink
          end
          to={"/react-stellar-burger/profile"}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to={"/react-stellar-burger/profile/orders"}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          История заказов
        </NavLink>
        <NavLink
          className={styles.link}
          onClick={handleLogout}
          to={"/react-stellar-burger/"}
        >
          Выход
        </NavLink>
        <p className={styles.text}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </div>
  );
};

export default Profile;
