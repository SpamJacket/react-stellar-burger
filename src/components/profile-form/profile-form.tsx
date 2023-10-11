import React, { FC, useMemo, useCallback, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "../../services/hooks/hooks";

import styles from "./profile-form.module.css";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { updateUser } from "../../services/actions/user";
import { useForm } from "../../services/hooks/useForm";

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [isNameDisabled, setIsNameDisabled] = React.useState<boolean>(true);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const onIconClick = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    setIsNameDisabled(false);
  };

  const saveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(values));
  };

  const cancelChanges = useCallback(() => {
    if (user) {
      return setValues({
        name: user.name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  React.useEffect(() => {
    cancelChanges();
  }, [cancelChanges]);

  const haveChanges = useMemo(() => {
    if (user) {
      return (
        values.name !== user.name ||
        values.email !== user.email ||
        (values.password !== "" && true)
      );
    }
    return false;
  }, [values, user]);

  return (
    <form className={styles.form} onSubmit={saveChanges}>
      {values.name !== undefined &&
        values.email !== undefined &&
        values.password !== undefined && (
          <>
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
          </>
        )}
      {haveChanges && (
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
