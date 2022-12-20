import React from "react";
import Menu from "../Menu/Menu";
import { SidebarProps } from "./Sidebar.props";
import s from "./Sidebar.module.css";
import cn from "classnames";
import Logo from "../logo.svg";

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, s.sidebar)} {...props}>
      <Logo className={s.logo} />
      <div>Search</div>
      <Menu />
    </div>
  );
};

export default Sidebar;
