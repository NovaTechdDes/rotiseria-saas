'use client';
import React from 'react';
import { Clock, User, Phone, Trash2, MapPin } from 'lucide-react';
import { Pedido } from '@/interface';
import { Button } from '@/components/ui/Button';

interface PedidoCardProps {
  pedido: Pedido;
  onEstadoChange: (id: number, nuevoEstado: string) => void;
  onDelete: (id: number) => void;
}

const ESTADOS = ['Pendiente', 'Preparando', 'Listo', 'Entregado'];

export const PedidoCard = ({ pedido, onEstadoChange, onDelete }: PedidoCardProps) => {
  // Formatear fecha
  const fecha = new Date(pedido.created_at || '').toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4 transition-all hover:shadow-md">
      {/* Cabecera: ID, Fecha y Botones de Estado */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 text-gray-500 text-sm mb-1">
            <span className="font-mono font-bold text-gray-400">#{pedido.id}</span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {fecha}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-medium text-gray-800">
              <User size={16} className="text-orange-500" /> {pedido.cliente}
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Phone size={16} /> {pedido.telefono}
            </div>
          </div>
          {/* Dirección si es envío */}
          {pedido.envio === 'Si' && (
            <div className="flex items-center gap-2 text-blue-600 text-sm mt-1 bg-blue-50 px-2 py-1 rounded w-fit">
              <MapPin size={14} /> {pedido.direccion}
            </div>
          )}
        </div>

        {/* Botonera de Estados */}
        <div className="flex flex-wrap gap-2">
          {ESTADOS.map((estado) => (
            <button
              key={estado}
              onClick={() => onEstadoChange(pedido.id!, estado)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                pedido.estado === estado
                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm' // Activo
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50' // Inactivo
              }`}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Productos (Tabla simple) */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Productos</p>
        <div className="space-y-2">
          {/* Usamos movProductos si viene de la base de datos, o productos si es local */}
          {pedido.movProductos?.map((mov: any) => (
            <div key={mov.id} className="flex justify-between text-sm">
              <span className="text-gray-700">
                <span className="font-bold">{mov.cantidad}x</span> {mov.descripcion}
              </span>
              <span className="font-medium text-gray-900">${mov.precioUnitario * mov.cantidad}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: Total y Acciones */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div className="text-2xl font-bold text-orange-600">Total: ${pedido.total}</div>

        <div className="flex gap-3">
          {/* Botón Eliminar */}
          <Button variant="danger" onClick={() => onDelete(pedido.id!)} className="px-3">
            <Trash2 size={18} /> Eliminar
          </Button>
        </div>
      </div>

      {/* Observaciones si existen */}
      {pedido.observaciones && <div className="mt-4 text-sm text-gray-500 bg-yellow-50 p-3 rounded border border-yellow-100 italic">"Note: {pedido.observaciones}"</div>}
    </div>
  );
};
