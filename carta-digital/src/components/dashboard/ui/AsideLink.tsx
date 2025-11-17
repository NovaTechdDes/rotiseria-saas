import React from 'react'
import NavLink from './NavLink'
import { LucideIcon, ShoppingBag } from 'lucide-react'
import { usePathname } from 'next/navigation';

interface Props {
    texto: string;
    icon: LucideIcon
}

export const AsideLink = ({ texto, icon: Icon }: Props) => {
    const pathName = usePathname();
    return (
        <li>
            <NavLink href={`/${texto[0].toLowerCase()}${texto.slice(1)}`} activePath={pathName}>
                <Icon size={20} />
                {texto}
            </NavLink>
        </li>
    )
}
