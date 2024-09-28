'use client'
import React, { useEffect, useState } from 'react'
import { MobileNavbarProps } from './MobileNavbar.type'
import Image from 'next/image'
import Link from 'next/link'
import { MenuItem, SubMenuItem } from './MenuItem'
import { usePathname } from 'next/navigation'
function MobileNavbar({}: MobileNavbarProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [subMenuOpen, setSubMenuOpen] = useState(false)
    const pathname = usePathname()
    useEffect(() => {
        setDropdownOpen(false)
    }, [pathname])

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen)
    }

    return (
        <nav className="fixed top-0 z-20 mx-auto flex h-12 w-full items-center justify-between bg-white px-3 shadow-lg lg:hidden">
            <Link href={'/'}>
                <Image src={'/favicon.ico'} alt="" height={40} width={40} />
            </Link>
            <div className="">
                <button
                    title="menuitem"
                    onClick={toggleDropdown}
                    className="inline-flex w-full justify-center text-sm font-medium transition duration-150"
                >
                    {dropdownOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    )}
                </button>
                {dropdownOpen && (
                    <div className="z absolute left-0 top-12 h-screen w-full origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <ul className="py-1">
                            <MenuItem className="" href="/">
                                Trang chủ
                            </MenuItem>
                            <MenuItem href="/ve-chung-toi">
                                Về chúng tôi
                            </MenuItem>
                            <li className="flex flex-col justify-between">
                                <div className="flex items-center justify-between border-b border-dashed p-4 transition duration-300 hover:text-[#47CFA9]">
                                    <Link
                                        href="/khoa-hoc-lai-xe"
                                        className="flex-1"
                                    >
                                        <span>Khoá học lái xe</span>
                                    </Link>
                                    <button onClick={toggleSubMenu}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {subMenuOpen && (
                                    <ul className="text-[#666666]">
                                        <SubMenuItem href="/">
                                            Khoá học lái xe B1
                                        </SubMenuItem>
                                        <SubMenuItem href="/">
                                            Khoá học lái xe B2
                                        </SubMenuItem>
                                        <SubMenuItem href="/">
                                            Khoá học lái xe ô tô tải hạng C
                                        </SubMenuItem>
                                        <SubMenuItem href="/">
                                            Khoá học lái xe máy hạng A1
                                        </SubMenuItem>
                                    </ul>
                                )}
                            </li>
                            <MenuItem href="/">Tài liệu ôn thi</MenuItem>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default MobileNavbar
