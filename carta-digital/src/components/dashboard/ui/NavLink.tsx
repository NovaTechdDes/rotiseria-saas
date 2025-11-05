import Link from 'next/link'
import React from 'react'

interface Props {
    href: string;
    activePath: string;
    children: React.ReactNode
}

const NavLink = ({ href, activePath, children }: Props) => {
    return (
        <Link href={href} className={`px-3 flex gap-2 py-2 rounded-md font-medium transition-colors  ${activePath === href
            ? "bg-orange-500 text-white"
            : "text-gray-800 hover:bg-gray-700 hover:text-white"
            }`}>
            {children}
        </Link>
    )
}

export default NavLink