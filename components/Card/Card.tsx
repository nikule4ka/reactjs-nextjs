import React, { ForwardedRef, forwardRef } from "react";
import { CardProps } from "./Card.props";
import cn from "classnames";
import s from "./Card.module.css";

const Card = forwardRef(
  (
    { children, color = "white", className, ...props }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div
        className={cn(s.card, className, {
          [s.blue]: color === "blue"
        })}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export default Card;
