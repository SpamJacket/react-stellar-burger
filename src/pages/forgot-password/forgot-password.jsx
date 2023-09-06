import React from "react";

import styles from "./forgot-password.module.css";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = React.useState("");

  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form}>
        <EmailInput
          onChange={onEmailChange}
          value={emailValue}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass={styles.formChild}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.formChild}
        >
          Восстановить
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

export default ForgotPassword;
