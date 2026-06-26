"use client";

import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./FormSelect.module.css";

type Option = {
  value: string;
  label: string;
};

type FormSelectProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  options: Option[];
  error?: string;
  register: UseFormRegister<T>;
};

const FormSelect = <
  T extends FieldValues /* fixes types error on hooks in page */,
>({
  label,
  name,
  options,
  error,
  register,
}: FormSelectProps<T>) => {
  const id = `form-select-${name}`;

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>
      <select
        {...register(name, { required: true })}
        id={id}
        aria-invalid={error ? "true" : "false"}
      >
        <option value="">Select a {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? <p role="alert">{error}</p> : null}
    </div>
  );
};

export default FormSelect;
