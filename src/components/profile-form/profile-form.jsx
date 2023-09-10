import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./profile-form.module.css";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { fetchWithRefresh } from "../../utils/api";
import { setUser } from "../../services/actions/user";
import useForm from "../../hooks/useForm";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [isNameDisabled, setIsNameDisabled] = React.useState(true);

  const inputRef = React.useRef(null);

  const onInputChange = (e) => {
    handleChange(e);
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setIsNameDisabled(false);
  };

  const saveChanges = (e) => {
    e.preventDefault();

    const body =
      values.password === ""
        ? {
            email: values.email,
            name: values.name,
          }
        : {
            email: values.email,
            name: values.name,
            password: values.password,
          };

    fetchWithRefresh("/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(body),
    })
      .then((res) => dispatch(setUser(res.user)))
      .catch((err) => Promise.reject(err));
  };

  const cancelChanges = () => {
    setValues({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  React.useEffect(() => {
    cancelChanges();
  }, [user]);

  const haveChanges = () => {
    return values.name !== user.name ||
      values.email !== user.email ||
      values.password !== ""
      ? true
      : false;
  };

  return (
    <form className={styles.form} onSubmit={saveChanges}>
      <Input
        type={"text"}
        placeholder="Имя"
        onChange={onInputChange}
        ref={inputRef}
        icon={"EditIcon"}
        onIconClick={onIconClick}
        disabled={isNameDisabled}
        onBlur={() => setIsNameDisabled(true)}
        value={values.name}
        name={"name"}
        size={"default"}
      />
      <EmailInput
        placeholder="Логин"
        onChange={onInputChange}
        isIcon={true}
        value={values.email}
        name={"email"}
      />
      <PasswordInput
        placeholder="Пароль"
        onChange={onInputChange}
        value={values.password}
        name={"password"}
        icon="EditIcon"
      />
      {haveChanges() && (
        <div className={styles.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.cancelButton}
            onClick={cancelChanges}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
