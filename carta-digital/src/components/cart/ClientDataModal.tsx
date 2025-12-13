'use client';
import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useRotiseriaStore } from '@/store';
import { enviarMensajeWhatsApp } from '@/helpers/whatsapp';
import { useCarritoStore } from '@/store/useCarritoStore';
import { useMutatePedidos } from '@/hooks/pedidos/useMutatePedidos';
import { Button } from '@/components/ui/Button';

interface Props {
  rotiseriaId: number;
}

const initialState = {
  nombre: '',
  telefono: '',
  tipoPago: 'efectivo',
  observaciones: '',
  direccion: '',
  envio: 'false',
  vuelto: 0,
};

export const ClientDataModal = ({ rotiseriaId }: Props) => {
  // 1. Stores y Hooks
  const { rotiseriaActive } = useRotiseriaStore();
  const { modalClienteCarrito, closeModalClienteCarrito, productos, total, resetCarrito } = useCarritoStore();
  const { agregarPedido } = useMutatePedidos(); // El hook que guarda en la base de datos

  const { isPending, mutateAsync: agregar } = agregarPedido;

  // 2. Estado del Formulario
  const [formData, setFormData] = useState(initialState);

  const [error, setError] = useState<boolean>(false);

  // Si el modal no está activo, no renderizamos nada
  if (!modalClienteCarrito) return null;

  // 3. Manejo de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Enviar Pedido
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre) {
      setError(true);
      return;
    }

    if (!formData.telefono) {
      setError(true);
      return;
    }

    if (formData.envio === 'true' && formData.direccion === '') {
      setError(true);
      return;
    }

    // Construimos el objeto pedido según la interfaz que pide el Backend
    const nuevoPedido: any = {
      cliente: formData.nombre,
      telefono: formData.telefono,
      direccion: formData.direccion,
      envio: formData.envio === 'true' ? true : false,
      vuelto: formData.vuelto - total,
      total: total,
      estado: 'Pendiente',
      observaciones: formData.observaciones,
      tipoPago: formData.tipoPago,
      usuarioId: 0, // Esto lo manejará el backend o se puede omitir si es público
      rotiseriaId: rotiseriaId || 0,
      productos: productos, // Mandamos los productos del carrito
    };

    // Ejecutamos la mutación (Guardar en Base de Datos)
    const ok = await agregar(nuevoPedido);

    if (ok) {
      closeModalClienteCarrito(); // Cerramos modal
      resetCarrito(); // Vaciamos carrito
      setFormData(initialState); //Reseteamos el formulario
      
      enviarMensajeWhatsApp({
        cliente: formData.nombre,
        telefono: formData.telefono,
        direccion: formData.direccion,
        tipoPago: formData.tipoPago,
        envio: formData.envio === 'true',
        observaciones: formData.observaciones,
        productos: productos,
        vuelto: Number(formData.vuelto),
        total: total,
      }, rotiseriaActive?.telefono || '');

      Swal.fire('¡Pedido Enviado!', 'Tu pedido ha sido recibido correctamente.', 'success');
      setError(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-orange-600 p-4 flex justify-between items-center text-white">
          <h2 className="text-lg font-bold">Completa tus datos</h2>
          <button onClick={closeModalClienteCarrito} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              required
            />
            {error && formData.nombre === '' && <p className="text-red-500 text-sm mt-1">Por favor completa el nombre</p>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (WhatsApp) *</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: 11 1234-5678"
              className="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-400 rounded-lg  focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              required
            />
            {error && formData.telefono === '' && <p className="text-red-500 text-sm mt-1">Por favor completa el teléfono</p>}
          </div>

          {/* Forma de Pago */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Forma de Pago</label>
            <select
              name="tipoPago"
              value={formData.tipoPago}
              onChange={handleChange}
              className="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
            >
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Mercado Pago / Transferencia</option>
              <option value="tarjeta">Tarjeta de Débito/Crédito</option>
            </select>
          </div>

          {/* Modalidad de Entrega */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="envio">
              Modalidad de Entrega
            </label>
            <select
              name="envio"
              id="envio"
              value={formData.envio}
              onChange={handleChange}
              className="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
            >
              <option value="false">Retiro en el local</option>
              <option value="true">Envio a domicilio</option>
            </select>
          </div>

          <div className={`${formData.envio === 'true' ? 'block' : 'hidden'}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="direccion">
              Direccion *
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
            {error && formData.direccion === '' && <p className="text-red-500 text-sm mt-1">Por favor completa la dirección</p>}
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={2}
              placeholder="Ej: Sin mayonesa, timbre no funciona..."
              className="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
            />
          </div>

          {formData.tipoPago === 'efectivo' && formData.envio === 'true' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="vuelto">
                ¿Con cuanto vas a Abonar? ¡Así llevamos el cambio justo!
              </label>
              <input
                type="number"
                className="text-black placeholder-gray-400 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                name="vuelto"
                value={formData.vuelto}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="pt-4 flex gap-3">
            <Button type="button" variant="secondary" fullWidth onClick={closeModalClienteCarrito}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" fullWidth disabled={isPending}>
              {isPending ? (
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
