'use client'
import { useAuth } from '@/hooks'
import { ArrowLeft, LayoutDashboard, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const AsideBar = () => {
    const router = useRouter();
    const { logOut: cerrarSesion } = useAuth();

    const handleLogOut = () => {
        cerrarSesion();
        router.push('/login')
    };

    return (
        <aside>
            <div className="flex flex-col h-full justify-between py-8 px-4 border-r border-gray-700 w-[200px] bg-white shadow-md min-h-full">
                <div>
                    <div className='flex text-orange-500 gap-5'>
                        <LayoutDashboard />
                        <h2 className="text-lg font-bold mb-8">Menú</h2>
                    </div>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <a href="/dashboard/pedidos" className="block text-gray-600 hover:text-orange-600 font-medium">
                                    Pedidos
                                </a>
                            </li>
                            <li>
                                <a href="/dashboard/productos" className="block text-gray-600 hover:text-orange-600 font-medium">
                                    Productos
                                </a>
                            </li>
                            <li>
                                <a href="/dashboard/categorias" className="block text-gray-600 hover:text-orange-600 font-medium">
                                    Categorías
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <ul className="space-y-3 mb-4">
                        <li>
                            <Link href="/dashboard/configuracion" className="block text-gray-600 hover:text-orange-600 font-medium">
                                Configuración
                            </Link>
                        </li>
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