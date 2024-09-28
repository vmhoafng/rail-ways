import React from "react";

export interface MenuItemProps extends React.ComponentPropsWithoutRef<"a"> {
  href: string;
  children: React.ReactNode;
}
export type SubMenuItemProps = { href: string; children: React.ReactNode };
