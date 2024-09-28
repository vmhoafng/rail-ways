import React from "react";
import { SidebarProps } from "./Sidebar.type";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";

function Sidebar({}: SidebarProps) {
  return (
    <div>
      <MobileSidebar />
      <DesktopSidebar />
    </div>
  );
}

export default Sidebar;
