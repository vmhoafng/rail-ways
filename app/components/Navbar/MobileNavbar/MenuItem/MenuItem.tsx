import React from 'react'
import { MenuItemProps } from './MenuItem.type'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
interface Props extends React.ComponentPropsWithoutRef<'a'> {}
function MenuItem({ href, children, className }: MenuItemProps) {
    const pathname = usePathname()

    return (
        <li className="">
            <Link
                href={href}
                className={`block border-b border-dashed p-4 ${className} ${pathname === href && 'text-[#47CFA9]'}`}
            >
                {children}
            </Link>
        </li>
    )
}

export default MenuItem
