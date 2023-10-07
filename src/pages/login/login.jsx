import { useDispatch } from "../../services/hooks/hooks";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.css";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../services/hooks/useForm";
import { loginUser } from "../../services/actions/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    handleChange(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput
          onChange={onInputChange}
          value={values.email}
          name={"email"}
          isIcon={false}
          extraClass={styles.formChild}
        />
        <PasswordInput
          onChange={onInputChange}
          value={values.password}
          name={"password"}
          extraClass={styles.formChild}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.formChild}
          disabled={!values.email || !values.password}
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
