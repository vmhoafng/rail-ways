import React from "react";
import { SidebarItemProps } from "./SidebarItem.type";
import Image from "next/image";

function Sidebar({ label, className }: SidebarItemProps) {
  return (
    <div
      className={`flex gap-1 pl-1 h-14 bg-gray-800 text-white w-12 hover:w-40 rounded-l-full transition-all duration-300 items-center justify-start ${className}`}
    >
      <Image alt="" src="/favicon.ico" width={40} height={40} />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

export default Sidebar;
