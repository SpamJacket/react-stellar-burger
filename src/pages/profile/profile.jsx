import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./profile.module.css";

import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { fetchWithRefresh } from "../../utils/api";
import { deleteUser } from "../../services/actions/user";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nameValue, setNameValue] = React.useState("");
  const [isNameDisabled, setIsNameDisabled] = React.useState(true);
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const inputRef = React.useRef(null);

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setIsNameDisabled(false);
  };

  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleLogout = (e) => {
    fetchWithRefresh("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(() => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        dispatch(deleteUser());
        navigate("/login");
      })
      .catch((err) => Promise.reject(err));
  };

  return (
    <div className={styles.container}>
      <nav className={styles.links}>
        <NavLink
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
      <form className={styles.form}>
        <Input
          type={"text"}
          placeholder="Имя"
          onChange={onNameChange}
          ref={inputRef}
          icon={"EditIcon"}
          onIconClick={onIconClick}
          disabled={isNameDisabled}
          onBlur={() => setIsNameDisabled(true)}
          value={nameValue}
          name={"name"}
          size={"default"}
          extraClass={styles.fromChild}
        />
        <EmailInput
          placeholder="Логин"
          onChange={onEmailChange}
          isIcon={true}
          value={emailValue}
          name={"email"}
          extraClass={styles.fromChild}
        />
        <PasswordInput
          placeholder="Пароль"
          onChange={onPasswordChange}
          value={passwordValue}
          name={"password"}
          icon="EditIcon"
          extraClass={styles.fromChild}
        />
      </form>
    </div>
  );
};

export default Profile;
