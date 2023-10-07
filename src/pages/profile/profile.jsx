import { useDispatch } from "../../services/hooks/hooks";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./profile.module.css";

import { logoutUser } from "../../services/actions/user";

const Profile = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div className={styles.container}>
      <nav className={styles.links}>
        <NavLink
          end
          to={"/profile"}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to={"/profile/orders"}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          История заказов
        </NavLink>
        <NavLink className={styles.link} onClick={handleLogout}>
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
