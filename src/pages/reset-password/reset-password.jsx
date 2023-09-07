import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

import styles from "./reset-password.module.css";

import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import request, { fetchWithRefresh } from "../../utils/api.js";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [passwordValue, setPasswordValue] = React.useState("");
  const [codeValue, setCodeValue] = React.useState("");

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const onCodeChange = (e) => {
    setCodeValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    fetchWithRefresh("/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordValue,
        token: codeValue,
      }),
    })
      .then(() => {
        localStorage.removeItem("resetFlag");
        navigate("/login");
      })
      .catch((err) => Promise.reject(err));
  };

  if (!localStorage.getItem("resetFlag")) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form}>
        <PasswordInput
          onChange={onPasswordChange}
          value={passwordValue}
          name={"password"}
          placeholder="Введите новый пароль"
          extraClass={styles.formChild}
        />
        <Input
          type="text"
          onChange={onCodeChange}
          value={codeValue}
          name={"code"}
          placeholder="Введите код из письма"
          size={"default"}
          extraClass={styles.formChild}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.formChild}
          onClick={onSubmit}
        >
          Сохранить
        </Button>
      </form>
      <p className={styles.text}>
        Вспомнили пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={styles.link}
          onClick={() => {
            localStorage.removeItem("resetFlag");
            navigate("/login");
          }}
        >
          Войти
        </Button>
      </p>
    </div>
  );
};

export default ResetPassword;
