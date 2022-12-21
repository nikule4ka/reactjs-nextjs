import React from "react";
import Menu from "../Menu/Menu";
import { SidebarProps } from "./Sidebar.props";
import s from "./Sidebar.module.css";
import cn from "classnames";
import Logo from "../logo.svg";
import { Search } from "../../components";

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, s.sidebar)} {...props}>
      <Logo className={s.logo} />
      <Search />
      <Menu />
    </div>
  );
};

export default Sidebar;
