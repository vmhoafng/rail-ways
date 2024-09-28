import React from "react";
import { SubMenuItemProps } from "./MenuItem.type";
import Link from "next/link";

function SubMenuItem({ href, children }: SubMenuItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="block py-3 px-5 hover:px-4 whitespace-nowrap hover:text-[#47CFA9] transform ease-in-out duration-200 hover:bg-black/5"
      >
        {children}
      </Link>
    </li>
  );
}

export default SubMenuItem;
