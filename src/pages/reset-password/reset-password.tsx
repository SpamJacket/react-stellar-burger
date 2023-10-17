import { FC, FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/hooks/hooks";

import styles from "./reset-password.module.css";

import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../services/hooks/useForm";
import { handleResetPassword } from "../../services/actionCreators/user";

const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    password: "",
    code: "",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(handleResetPassword(values)).then(() => {
      navigate("/login");
    });
  };

  if (
    localStorage.getItem("resetFlag") === "false" ||
    !localStorage.getItem("resetFlag")
  ) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <PasswordInput
          onChange={handleChange}
          value={values.password as string}
          name={"password"}
          placeholder="Введите новый пароль"
          extraClass={styles.formChild}
        />
        <Input
          type="text"
          onChange={handleChange}
          value={values.code as string}
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
