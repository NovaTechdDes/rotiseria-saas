'use client';

import { useCarritoStore, useCategoriaStore, useProductoStore } from '@/store';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Swal from 'sweetalert2';

interface ProductProps {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  rotiseriaId: number;
  categoriaId: number;
}

export const ProductCardClient = ({ id, nombre, descripcion, precio, imagen, rotiseriaId, categoriaId }: ProductProps) => {
  const { setProductos: agregarAlCarrito } = useCarritoStore();
  const { categoriaSeleccionada } = useCategoriaStore();
  const { filtro } = useProductoStore();

  if (!nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())) {
    return null;
  }

  if (categoriaSeleccionada !== 0 && categoriaSeleccionada !== categoriaId) {
    return null;
  }
  const handleAgregar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const producto = {
      id,
      nombre,
      descripcion,
      precio,
      imagen,
      rotiseriaId,
    };
    agregarAlCarrito({ producto, cantidad: 1 });

    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: `¡${producto.nombre} agregado al carrito!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      background: '#fff',
      color: '#333',
    });
  };
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Contenedor Imagen y Precio */}
      <div className="relative h-48 w-full bg-gray-100">
        <Image priority src={imagen} alt={nombre} width={500} height={500} className="w-full h-full object-cover" />
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800 text-lg">{nombre}</h3>
          <span className="text-orange-600 font-bold text-lg">${precio.toFixed(2)}</span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{descripcion}</p>

        {/* Botón Rosado  */}
        <button
          onClick={handleAgregar}
          className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-auto active:scale-95 transform duration-100"
        >
          <Plus size={18} />
          Agregar al Pedido
        </button>
      </div>
    </div>
  );
};
