import React from 'react'
import { LayoutProps } from './PageLayout.type'
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import Sidebar from '../../Sidebar'
import RegisterModal from '../../Modal/RegisterModal/RegisterModal'
import { usePathname } from 'next/navigation'

function Layout({ children, header }: LayoutProps) {
    const pathname = usePathname()
    let content

    switch (pathname) {
        case '/':
            content = <p>Welcome to the Home Page!</p>
            break
        case '/ve-chung-toi':
            content = <p>Về chúng tôi</p>
            break
        case '/khoa-hoc-lai-xe':
            content = <p>Khoá học lái xe</p>
            break
        default:
            content = <p>Page not found.</p>
            break
    }
    return (
        <div className="relative">
            <div className="bg-gradient-to-br from-[rgb(65,84,241)] to-[rgb(6,17,105)] py-24 text-white">
                <div className="container-custom w-full px-3 lg:px-10 xl:px-0">
                    <h1 className="mb-3 text-4xl font-bold">{header}</h1>
                    <ol className="flex">
                        <li>Trang chủ</li>
                        <li className="flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M9 6l6 6l-6 6" />
                            </svg>
                            {content}
                        </li>
                    </ol>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Layout
