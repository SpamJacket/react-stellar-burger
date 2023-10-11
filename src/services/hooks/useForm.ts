import React, { ChangeEvent } from "react";
import type { TInputs } from "../../utils/types";

export function useForm(inputValues: TInputs = {}) {
  const [values, setValues] = React.useState<TInputs>(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
