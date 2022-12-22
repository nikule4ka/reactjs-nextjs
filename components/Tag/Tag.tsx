import { TagProps } from "./Tag.props";
import s from "./Tag.module.css";
import cn from "classnames";

const Tag = ({
  children,
  size = "s",
  color = "ghost",
  className,
  href,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(s.tag, className, {
        [s.s]: size === "s",
        [s.m]: size === "m",
        [s.ghost]: color === "ghost",
        [s.green]: color === "green",
        [s.grey]: color === "grey",
        [s.primary]: color === "primary",
        [s.red]: color === "red"
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};

export default Tag;
