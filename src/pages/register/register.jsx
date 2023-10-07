import { useDispatch } from "../../services/hooks/hooks";
import { useNavigate } from "react-router-dom";

import styles from "./register.module.css";

import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { registerUser } from "../../services/actions/user";
import { useForm } from "../../services/hooks/useForm";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    handleChange(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(values));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="text"
          onChange={onInputChange}
          value={values.name}
          name={"name"}
          placeholder="Имя"
          size={"default"}
          extraClass={styles.formChild}
        />
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
          disabled={!values.name || !values.email || !values.password}
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
          onClick={() => {
            navigate("/login");
          }}
        >
          Войти
        </Button>
      </p>
    </div>
  );
};

export default Register;
