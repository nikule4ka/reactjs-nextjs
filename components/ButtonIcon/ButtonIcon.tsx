import s from "./ButtonIcon.module.css";
import cn from "classnames";
import { ButtonIconProps, icons } from "./ButtonIcon.props";

const ButtonIcon = ({
  appearance,
  className,
  icon,
  ...props
}: ButtonIconProps): JSX.Element => {
  const IconComp = icons[icon];

  return (
    <button
      className={cn(s.button, className, {
        [s.white]: appearance === "white",
        [s.primary]: appearance === "primary"
      })}
      {...props}
    >
      <IconComp />
    </button>
  );
};

export default ButtonIcon;
