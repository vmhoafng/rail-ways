'use client'
import React, { useState } from 'react'
import { DesktopNavbarProps } from './DesktopNavbar.type'
import Link from 'next/link'
import Image from 'next/image'
import { MenuItem, SubMenuItem } from '../DesktopNavbar/MenuItem'
import { useModal } from '../../Modal/RegisterModal/RegisterModalContext'
import { usePathname } from 'next/navigation'

function DesktopNavbar({}: DesktopNavbarProps) {
    const { openModal } = useModal()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const pathname = usePathname()
    return (
        <nav className="fixed top-0 z-20 hidden w-full bg-white shadow-xl lg:block">
            <div className="flex h-20 items-center justify-between px-10 lg:mx-auto lg:max-w-[1140px] xl:px-0 2xl:max-w-[1440px]">
                <div className="text-xl font-bold">Logo</div>
                <ul className="flex h-full items-center justify-center">
                    <MenuItem href={'/'}>Trang chủ</MenuItem>
                    <MenuItem href={'/ve-chung-toi'}>Về chúng tôi</MenuItem>

                    <li
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                        className="relative px-2"
                    >
                        <Link
                            href={'/khoa-hoc-lai-xe'}
                            className={`flex items-center transition duration-300 hover:text-[#47CFA9] ${pathname === '/courses' && 'text-[#47CFA9]'}`}
                        >
                            Khoá học lái xe
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="#47CFA9"
                                className="size-6 pl-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                                />
                            </svg>
                        </Link>
                        <ul
                            className={`absolute w-64 transform bg-white py-2 shadow-lg transition-transform duration-300 ${
                                dropdownOpen
                                    ? 'translate-y-0 opacity-100'
                                    : 'pointer-events-none -translate-y-2 opacity-0'
                            }`}
                        >
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
                    </li>
                    <MenuItem href={'#'}>Tài liệu ôn thi</MenuItem>
                    <li className="ml-5 block">
                        <div
                            onClick={openModal}
                            className="block rounded-full bg-[#47CFA9] px-7 py-2 text-lg text-white transition duration-300 hover:bg-[#041686]"
                        >
                            Đăng ký học
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default DesktopNavbar
