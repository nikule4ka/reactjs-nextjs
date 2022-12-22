import React, { ForwardedRef, forwardRef } from "react";
import { InputProps } from "./Input.props";
import cn from "classnames";
import s from "./Input.module.css";

const Input = forwardRef(
  (
    { className, error, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={cn(className, s.inputWrapper)}>
        <input
          ref={ref}
          className={cn(s.input, {
            [s.error]: error
          })}
          {...props}
        />
        {error && <span className={s.errorMessage}> {error.message}</span>}
      </div>
    );
  }
);

export default Input;
