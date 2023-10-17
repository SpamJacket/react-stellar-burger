import React, { ChangeEvent } from "react";
import type { Inputs } from "../../utils/types";

export function useForm(inputValues: Inputs = {}) {
  const [values, setValues] = React.useState<Inputs>(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
