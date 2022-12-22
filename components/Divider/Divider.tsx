import cn from "classnames";
import React from "react";
import s from "./Divider.module.css";
import { DividerProps } from "./Divider.props";

const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
  return <hr className={cn(className, s.hr)} {...props} />;
};

export default Divider;
