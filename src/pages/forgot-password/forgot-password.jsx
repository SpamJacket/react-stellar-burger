import { useNavigate } from "react-router-dom";

import styles from "./forgot-password.module.css";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import request from "../../utils/api.js";
import useForm from "../../hooks/useForm.js";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    email: "",
  });

  const onInputChange = (e) => {
    handleChange(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    request("/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    }).then(() => {
      localStorage.setItem("resetFlag", true);
      navigate("/reset-password");
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput
          onChange={onInputChange}
          value={values.email}
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
          disabled={!values.email}
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
          onClick={() => navigate("/login")}
        >
          Войти
        </Button>
      </p>
    </div>
  );
};

export default ForgotPassword;
