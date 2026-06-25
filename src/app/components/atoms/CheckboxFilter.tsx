import "../styles/atoms/checkboxFilter.css";
import type { ReactNode } from "react";

type Option<T> = {
  value: T;
  label: ReactNode;
};

type CheckboxFilterProps<T> = {
  legend: string;
  options: Option<T>[];
  value: T[];
  onChange: (selected: T[]) => void;
};

const CheckboxFilter = <T,>({
  legend,
  options,
  value,
  onChange,
}: CheckboxFilterProps<T>) => {
  const toggle = (item: T) => {
    onChange(
      value.includes(item) ? value.filter((v) => v !== item) : [...value, item],
    );
  };

  return (
    <fieldset className="checkboxFilter">
      <legend>{legend}</legend>
      {options.map((option) => (
        <label key={String(option.value)}>
          <input
            type="checkbox"
            checked={value.includes(option.value)}
            onChange={() => toggle(option.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
};

export default CheckboxFilter;
