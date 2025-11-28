'use client';
import { Plus } from 'lucide-react';
import Image from 'next/image';

interface ProductProps {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  onAdd: () => void;
}

export const ProductCardClient = ({
  nombre,
  descripcion,
  precio,
  imagen,
  onAdd,
}: ProductProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Contenedor Imagen y Precio */}
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          priority
          src={imagen}
          alt={nombre}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800 text-lg">{nombre}</h3>
          <span className="text-orange-600 font-bold text-lg">${precio}</span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
          {descripcion}
        </p>

        {/* Botón Rosado  */}
        <button
          onClick={onAdd}
          className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-auto active:scale-95 transform duration-100"
        >
          <Plus size={18} />
          Agregar al Pedido
        </button>
      </div>
    </div>
  );
};
