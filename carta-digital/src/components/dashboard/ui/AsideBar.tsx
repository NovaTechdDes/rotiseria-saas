'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks'
import { AsideLink } from './AsideLink'
import { ArrowLeft, ChartColumn, Cog, DollarSign, FolderOpen, LayoutDashboard, LogOut, Package, ShoppingBag } from 'lucide-react'

const AsideBar = () => {

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
                            <AsideLink texto='Pedidos' icon={ShoppingBag} />
                            <AsideLink texto='Productos' icon={FolderOpen} />
                            <AsideLink texto='Categorias' icon={FolderOpen} />
                            <AsideLink texto='Egresos' icon={DollarSign} />
                            <AsideLink texto='Reportes' icon={ChartColumn} />
                            <AsideLink texto='Configuracion' icon={Cog} />
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