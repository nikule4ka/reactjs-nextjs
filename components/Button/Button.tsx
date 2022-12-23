import { ButtonProps } from "./Button.props";
import s from "./Button.module.css";
import ArrowIcon from "./arrow.svg";
import { motion } from "framer-motion";
import cn from "classnames";

const Button = ({
  children,
  appearance,
  arrow = "none",
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={cn(s.button, className, {
        [s.ghost]: appearance === "ghost",
        [s.primary]: appearance === "primary"
      })}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span
          className={cn(s.arrow, {
            [s.down]: arrow === "down"
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
};

export default Button;
