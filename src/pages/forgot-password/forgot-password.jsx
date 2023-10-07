import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/hooks/hooks";

import styles from "./forgot-password.module.css";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../services/hooks/useForm";
import { handleForgotPassword } from "../../services/actions/user";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    email: "",
  });

  const onInputChange = (e) => {
    handleChange(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(handleForgotPassword(values));
    navigate("/reset-password");
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
