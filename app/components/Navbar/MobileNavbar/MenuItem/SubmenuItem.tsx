import React from "react";
import { SubMenuItemProps } from "./MenuItem.type";
import Link from "next/link";

function SubMenuItem({ href, children }: SubMenuItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="block border-b border-dashed p-4 px-6 hover:px- hover:text-[#47CFA9] transform ease-in-out duration-200 hover:bg-black/5"
      >
        {children}
      </Link>
    </li>
  );
}

export default SubMenuItem;
