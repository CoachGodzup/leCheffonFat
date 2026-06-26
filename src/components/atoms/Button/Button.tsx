import type { ReactNode } from "react";

import "./button.css";

type ButtonProps = {
  text: ReactNode;
  click: () => void;
  active: boolean;
};

const Button = ({ text, click, active }: ButtonProps) => (
  <button
    className={`button ${active ? "buttonActive" : ""}`}
    onClick={click}
    aria-pressed={active}
  >
    {text}
  </button>
);

export default Button;
