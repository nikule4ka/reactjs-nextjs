import React, { ForwardedRef, forwardRef } from "react";
import cn from "classnames";
import s from "./TextArea.module.css";
import { TextAreaProps } from "./TextArea.props";

const TextArea = forwardRef(
  (
    { className, error, ...props }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    return (
      <div className={cn(className, s.textareaWrapper)}>
        <textarea
          ref={ref}
          placeholder="test"
          className={cn(s.textarea, {
            [s.error]: error
          })}
          {...props}
        />
        {error && (
          <span role="alert" className={s.errorMessage}>
            {" "}
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

export default TextArea;
