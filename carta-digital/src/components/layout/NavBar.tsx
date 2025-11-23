'use client';
import Link from 'next/link';
import { ShoppingCart, UserCog, Clock, Phone } from 'lucide-react';
import { useCarritoStore } from '@/store/useCarritoStore';
import Image from 'next/image';

interface NavbarProps {
  nombre: string;
  telefono: string;
  horario: string;
  logo?: string;
}

export const Navbar = ({ nombre, telefono, horario, logo }: NavbarProps) => {
  const { openModal, productos } = useCarritoStore();
  // Calculamos la cantidad total de items para el badge rojo
  const totalItems =
    productos?.reduce((acc, item) => acc + item.cantidad, 0) || 0;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div>
              <Image
                src={logo || '/logo.png'}
                className="rounded-lg"
                alt="Logo"
                width={50}
                height={50}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-orange-800 leading-none">
                {nombre}
              </h1>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {horario}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {telefono}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="px-4 cursor-pointer  py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors flex items-center gap-2">
                <UserCog size={16} />
                Panel Admin
              </button>
            </Link>

            <button
              onClick={openModal}
              className="px-4 py-2 cursor-pointer bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-sm relative"
            >
              <ShoppingCart size={18} />
              {/* Badge de cantidad  */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
