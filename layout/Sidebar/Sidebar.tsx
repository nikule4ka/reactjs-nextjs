import React from "react";
import Menu from "../Menu/Menu";
import { SidebarProps } from "./Sidebar.props";

const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
  return (
    <div {...props}>
      <Menu />
    </div>
  );
};

export default Sidebar;
