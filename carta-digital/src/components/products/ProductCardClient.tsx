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

export const ProductCardClient = ({ nombre, descripcion, precio, imagen, onAdd }: ProductProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      
      {/* Contenedor Imagen y Precio */}
      <div className="relative h-48 w-full bg-gray-100">
        <img 
            src={imagen} 
            alt={nombre}
            className="w-full h-full object-cover"
        />
        {/* Etiqueta de Precio Flotante */}
        <span className="absolute top-3 right-3 bg-orange-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
            ${precio}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{nombre}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
            {descripcion}
        </p>

        {/* Botón Rosado  */}
        <button 
            onClick={onAdd}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-auto active:scale-95 transform duration-100"
        >
            <Plus size={18} />
            Agregar al Pedido
        </button>
      </div>
    </div>
  );
};