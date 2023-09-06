import React from "react";

import styles from "./register.module.css";

import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Register = () => {
  const [nameValue, setNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form}>
        <Input
          type="text"
          onChange={onNameChange}
          value={nameValue}
          name={"name"}
          placeholder="Имя"
          size={"default"}
          extraClass={styles.formChild}
        />
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
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className={styles.text}>
        Уже зарегистрированы?
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

export default Register;
