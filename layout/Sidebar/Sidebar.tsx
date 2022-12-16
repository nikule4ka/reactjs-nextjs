import React from "react";
import { SidebarProps } from "./SIdebar.props";

const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
  return <div {...props}>Sidebar</div>;
};

export default Sidebar;
