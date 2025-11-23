'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderOpen,
  LogOut,
  ArrowLeft,
  Store,
} from 'lucide-react';

// Importamos los hooks necesarios
import { useAuth } from '@/hooks';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';

export default function AsideBar() {
  // 1. Hooks para lógica de navegación y estado
  const pathname = usePathname();
  const { logOut } = useAuth();
  const { rotiseriaActive } = useRotiseriaStore();

  // 2. Definimos los items del menú
  const menuItems = [
    {
      name: 'Pedidos',
      href: '/admin/pedidos',
      icon: ShoppingBag,
    },
    {
      name: 'Productos',
      href: '/admin/productos',
      icon: Package,
    },
    {
      name: 'Categorías',
      href: '/admin/categorias',
      icon: FolderOpen,
    },
    // Puedes agregar más items aquí (ej: Reportes, Configuración)
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-30 shadow-sm">
      {/* --- HEADER DEL SIDEBAR --- */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 text-orange-600 mb-1">
          <LayoutDashboard size={28} strokeWidth={2.5} />
          <span className="text-xl font-bold tracking-tight text-gray-800">
            Dashboard
          </span>
        </div>
        <p className="text-xs text-gray-400 pl-10">Gestión de tu local</p>
      </div>

      {/* --- NAVEGACIÓN PRINCIPAL --- */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          // Verificamos si la ruta actual coincide con el link
          const isActive = pathname.includes(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-200' // Estilo Activo (Naranja)
                  : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600' // Estilo Inactivo
              }`}
            >
              {/* El icono cambia de color o grosor si está activo */}
              <item.icon
                size={20}
                className={`transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'}`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* --- FOOTER --- */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="space-y-2">
          <Link
            href={`/`}
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all"
          >
            <Store size={18} className="text-gray-400" />
            Ver mi Carta
          </Link>

          {/* Botón de Cerrar Sesión */}
          <button
            onClick={logOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>

        {/* Info del usuario */}
        <div className="mt-4 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            {rotiseriaActive?.nombre || 'Panel Admin'}
          </p>
        </div>
      </div>
    </aside>
  );
}
