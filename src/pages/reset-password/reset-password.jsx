import React from "react";

import styles from "./reset-password.module.css";

import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPassword = () => {
  const [passwordValue, setPasswordValue] = React.useState("");
  const [codeValue, setCodeValue] = React.useState("");

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const onCodeChange = (e) => {
    setCodeValue(e.target.value);
  };

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
        >
          Войти
        </Button>
      </p>
    </div>
  );
};

export default ResetPassword;
