import React from "react";
import { CardProps } from "./Card.props";
import cn from "classnames";
import s from "./Card.module.css";

const Card = ({
  children,
  color = "white",
  className,
  ...props
}: CardProps): JSX.Element => {
  return (
    <div
      className={cn(s.card, className, {
        [s.blue]: color === "blue"
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
