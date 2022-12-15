import React from "react";
import { ParagraphProps } from "./Paragraph.props";
import cn from "classnames";
import s from "./Paragraph.module.css";

const Paragraph = ({
  children,
  size = "medium",
  className,
  ...props
}: ParagraphProps): JSX.Element => {
  return (
    <p
      className={cn(s.p, className, {
        [s.small]: size === "small",
        [s.medium]: size === "medium",
        [s.large]: size === "large"
      })}
      {...props}
    >
      {children}
    </p>
  );
};

export default Paragraph;
