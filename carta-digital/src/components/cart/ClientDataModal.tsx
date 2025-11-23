'use client';
import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2'; // Usamos SweetAlert para confirmar

// Imports de lógica
import { useCarritoStore } from '@/store/useCarritoStore';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import { useMutatePedidos } from '@/hooks/pedidos/useMutatePedidos';
import { Button } from '@/components/ui/Button';

export const ClientDataModal = () => {
  // 1. Stores y Hooks
  const {
    modalClienteCarrito,
    closeModalClienteCarrito,
    productos,
    total,
    resetCarrito,
  } = useCarritoStore();
  const { rotiseriaActive } = useRotiseriaStore();
  const { agregarPedido } = useMutatePedidos(); // El hook que guarda en la base de datos

  // 2. Estado del Formulario
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    tipoPago: 'Efectivo',
    observaciones: '',
    direccion: '', // Opcional si es delivery
    envio: false,
  });

  // Si el modal no está activo, no renderizamos nada
  if (!modalClienteCarrito) return null;

  // 3. Manejo de inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Enviar Pedido
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.telefono) {
      alert('Por favor completa nombre y teléfono');
      return;
    }

    // Construimos el objeto pedido según la interfaz que pide el Backend
    const nuevoPedido: any = {
      cliente: formData.nombre,
      telefono: formData.telefono,
      direccion: formData.direccion,
      envio: formData.envio ? 'Si' : 'No', // Ajustar según tu base de datos
      vuelto: 0, // Podrías agregar un campo para "¿Con cuánto pagas?"
      total: total,
      estado: 'Pendiente',
      observaciones: formData.observaciones,
      tipoPago: formData.tipoPago,
      usuarioId: 0, // Esto lo manejará el backend o se puede omitir si es público
      rotiseriaId: rotiseriaActive?.id || 0,
      productos: productos, // Mandamos los productos del carrito
    };

    // Ejecutamos la mutación (Guardar en Base de Datos)
    agregarPedido.mutate(nuevoPedido, {
      onSuccess: () => {
        closeModalClienteCarrito(); // Cerramos modal
        resetCarrito(); // Vaciamos carrito
        Swal.fire(
          '¡Pedido Enviado!',
          'Tu pedido ha sido recibido correctamente.',
          'success'
        );
      },
      onError: () => {
        Swal.fire('Error', 'Hubo un problema al enviar el pedido.', 'error');
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-orange-600 p-4 flex justify-between items-center text-white">
          <h2 className="text-lg font-bold">Completa tus datos</h2>
          <button
            onClick={closeModalClienteCarrito}
            className="text-white/80 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className="text-black placeholder-gray-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono (WhatsApp) *
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: 11 1234-5678"
              className="text-black placeholder-gray-300 w-full px-4 py-2 border border-gray-400 rounded-lg  focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              required
            />
          </div>

          {/* Forma de Pago */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Forma de Pago
            </label>
            <select
              name="tipoPago"
              value={formData.tipoPago}
              onChange={handleChange}
              className="text-black placeholder-gray-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Mercado Pago">Mercado Pago / Transferencia</option>
              <option value="Tarjeta">Tarjeta de Débito/Crédito</option>
            </select>
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={2}
              placeholder="Ej: Sin mayonesa, timbre no funciona..."
              className="text-black placeholder-gray-300 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={closeModalClienteCarrito}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={agregarPedido.isPending}
            >
              {agregarPedido.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> Enviando...
                </span>
              ) : (
                `Mandar Pedido por WhatsApp ($${total})`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
