import React from "react";
import { InputProps } from "./Input.props";
import cn from "classnames";
import s from "./Input.module.css";

const Input = ({ className, ...props }: InputProps): JSX.Element => {
  return (
    <input placeholder="test" className={cn(className, s.input)} {...props} />
  );
};

export default Input;
