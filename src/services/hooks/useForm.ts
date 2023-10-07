import React from "react";
import type { TInputs } from "../../utils/types";

export function useForm(inputValues: TInputs = {}): {
  values: TInputs;
  handleChange: Function;
  setValues: Function;
} {
  const [values, setValues] = React.useState<TInputs>(inputValues);

  const handleChange = (e: any): void => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
