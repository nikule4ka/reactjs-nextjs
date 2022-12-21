import React from "react";
import cn from "classnames";
import s from "./TextArea.module.css";
import { TextAreaProps } from "./TextArea.props";

const TextArea = ({ className, ...props }: TextAreaProps): JSX.Element => {
  return (
    <textarea
      placeholder="test"
      className={cn(className, s.input)}
      {...props}
    />
  );
};

export default TextArea;
