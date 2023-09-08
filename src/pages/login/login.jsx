import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.css";

import request from "../../utils/api.js";
import { setUser } from "../../services/actions/user.js";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    request("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then((res) => {
        dispatch(setUser(res.user));
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
      })
      // .then(() => {
      //   navigate("/profile");
      // })
      .catch((err) => Promise.reject(err));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form}>
        <EmailInput
          onChange={onEmailChange}
          value={emailValue}
          name={"email"}
          isIcon={false}
          extraClass={styles.formChild}
        />
        <PasswordInput
          onChange={onPasswordChange}
          value={passwordValue}
          name={"password"}
          extraClass={styles.formChild}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.formChild}
          onClick={onSubmit}
          disabled={!emailValue || !passwordValue}
        >
          Войти
        </Button>
      </form>
      <p className={styles.text}>
        Вы — новый пользователь?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={styles.link}
          onClick={() => {
            navigate("/register");
          }}
        >
          Зарегистрироваться
        </Button>
      </p>
      <p className={styles.text}>
        Забыли пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={styles.link}
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          Восстановить пароль
        </Button>
      </p>
    </div>
  );
};

export default Login;
