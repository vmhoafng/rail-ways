"use client"
import { useState } from "react";

type MenuState = {
  [key: string]: boolean;
};

const useDropdownMenu = (initialState: MenuState = {}) => {
  const [openMenus, setOpenMenus] = useState<MenuState>(initialState);

  const toggleMenu = (menuKey: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const closeAllMenus = () => {
    setOpenMenus({});
  };

  return { openMenus, toggleMenu, closeAllMenus };
};

export default useDropdownMenu;
