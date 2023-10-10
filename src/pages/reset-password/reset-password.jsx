import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/hooks/hooks";

import styles from "./reset-password.module.css";

import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../services/hooks/useForm";
import { handleResetPassword } from "../../services/actions/user";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    password: "",
    code: "",
  });

  const onInputChange = (e) => {
    handleChange(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(handleResetPassword(values, navigate))
      .then(() => navigate("/login"))
      .catch(console.error);
  };

  if (
    (localStorage.getItem("resetFlag") === "false") |
    !localStorage.getItem("resetFlag")
  ) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <PasswordInput
          onChange={onInputChange}
          value={values.password}
          name={"password"}
          placeholder="Введите новый пароль"
          extraClass={styles.formChild}
        />
        <Input
          type="text"
          onChange={onInputChange}
          value={values.code}
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
          disabled={!values.code || !values.password}
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
            localStorage.setItem("resetFlag", "false");
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
