'use client'
import { useAuth } from '@/hooks'
import { ArrowLeft, ChartColumn, Cog, DollarSign, FolderOpen, LayoutDashboard, LogOut, Package, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import NavLink from './NavLink'

const AsideBar = () => {
    const pathName = usePathname();
    const router = useRouter();
    const { logOut: cerrarSesion } = useAuth();


    const handleLogOut = () => {
        cerrarSesion();
        router.push('/login')
    };

    return (
        <aside className="bg-white border-r fixed shadow-md border-gray-700 z-20" >
            <div className="flex flex-col justify-between py-8 px-4 w-[200px] bg-white h-[100dvh]">
                <div>
                    <div className='flex text-orange-500 gap-5'>
                        <LayoutDashboard />
                        <h2 className="text-lg font-bold mb-8">Menú</h2>
                    </div>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <NavLink href="/pedidos" activePath={pathName}>
                                    <ShoppingBag size={20} />
                                    Pedidos
                                </NavLink>
                            </li>
                            <li >
                                <NavLink href='/productos' activePath={pathName} >
                                    <Package size={20} />
                                    Productos
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/categorias" activePath={pathName}>
                                    <FolderOpen size={20} />
                                    Categorías
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/egresos" activePath={pathName}>
                                    <DollarSign size={20} />
                                    Egresos
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/reportes" activePath={pathName}>
                                    <ChartColumn size={20} />
                                    Reportes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/configuracion" activePath={pathName}>
                                    <Cog size={20} />
                                    Configuración
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <ul className="space-y-3 mb-4">

                        <li>
                            <Link href="/" className="flex gap-2 justify-center items-center rounded-sm border border-slate-500 text-gray-600 hover:text-white hover:bg-orange-600 font-medium">
                                <ArrowLeft size={20} />
                                Ver carta
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogOut} className="hover:opacity-80 justify-center gap-2 items-center hover:cursor-pointer w-full text-left flex text-red-500  font-medium">
                                <LogOut size={20} />
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default AsideBar