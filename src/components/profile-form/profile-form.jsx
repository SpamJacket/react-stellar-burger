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

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const [nameValue, setNameValue] = React.useState("");
  const [isNameDisabled, setIsNameDisabled] = React.useState(true);
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const inputRef = React.useRef(null);

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setIsNameDisabled(false);
  };

  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const saveChanges = (e) => {
    e.preventDefault();

    const body =
      passwordValue === ""
        ? {
            email: emailValue,
            name: nameValue,
          }
        : {
            email: emailValue,
            name: nameValue,
            password: passwordValue,
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
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue("");
  };

  React.useEffect(() => {
    cancelChanges();
  }, [user]);

  const haveChanges = () => {
    return nameValue !== user.name ||
      emailValue !== user.email ||
      passwordValue !== ""
      ? true
      : false;
  };

  return (
    <form className={styles.form}>
      <Input
        type={"text"}
        placeholder="Имя"
        onChange={onNameChange}
        ref={inputRef}
        icon={"EditIcon"}
        onIconClick={onIconClick}
        disabled={isNameDisabled}
        onBlur={() => setIsNameDisabled(true)}
        value={nameValue}
        name={"name"}
        size={"default"}
      />
      <EmailInput
        placeholder="Логин"
        onChange={onEmailChange}
        isIcon={true}
        value={emailValue}
        name={"email"}
      />
      <PasswordInput
        placeholder="Пароль"
        onChange={onPasswordChange}
        value={passwordValue}
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
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            onClick={(e) => saveChanges(e)}
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
