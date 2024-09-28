import React from "react";
import { NavbarProps } from "./Navbar.type";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

function Navbar({}: NavbarProps) {
  return (
    <div className="">
      <MobileNavbar />
      <DesktopNavbar />
    </div>
  );
}

export default Navbar;
