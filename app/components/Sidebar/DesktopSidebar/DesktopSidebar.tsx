import React from "react";
import { SidebarProps } from "./DesktopSidebar.type";
import SidebarItem from "./SidebarItem";

function Sidebar({}: SidebarProps) {
  return (
    <div className="hidden lg:fixed lg:flex flex-col items-end h-screen top-1/2 right-0 cursor-pointer gap-1">
      <SidebarItem label="Item 1" className="bg-[#e60808]" />
      <SidebarItem label="Item 2" className="bg-[#0087FD]" />
      <SidebarItem label="Item 3" className="bg-[#0018E2]" />
      <SidebarItem label="Item 4" className="bg-[#ff9900]" />
    </div>
  );
}

export default Sidebar;
