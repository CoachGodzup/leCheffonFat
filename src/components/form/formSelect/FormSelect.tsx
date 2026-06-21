"use client";

import type { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./FormSelect.module.css";

type Option = {
  value: string;
  label: string;
};

type FormSelectProps = {
  label: string;
  name: string;
  options: Option[];
  error?: string;
  register: UseFormRegister<FieldValues>;
};

const FormSelect = ({
  label,
  name,
  options,
  error,
  register,
}: FormSelectProps) => {
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
      {error ? <p role="alert">{error}</p> : <p></p>}
    </div>
  );
};

export default FormSelect;
