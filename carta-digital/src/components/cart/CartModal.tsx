'use client';
import { X, Plus, Minus, Send } from 'lucide-react';
import { useCarritoStore } from '@/store/useCarritoStore';
import { Button } from '@/components/dashboard/ui/Button'; 

export const CartModal = () => {
  // 1. Conectamos con la "Comanda" (Store)
  const { 
    productos, 
    total, 
    addItem, 
    subsItem, 
    modalAbierto, 
    closeModal,
    openModalClienteCarrito 
  } = useCarritoStore();

  if (!modalAbierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Contenedor del Modal  */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Encabezado */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-orange-800">Tu Pedido</h2>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(!productos || productos.length === 0) ? (
            <div className="text-center py-10 text-gray-500">
                <p>Tu carrito está vacío ☹️</p>
                <p className="text-sm mt-2">¡Agrega algo rico del menú!</p>
            </div>
          ) : (
            productos.map((item) => (
              <div key={item.producto.id} className="flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                
                {/* Imagen pequeña */}
                <img 
                    src={item.producto.imagen || '/placeholder.jpg'} 
                    alt={item.producto.nombre} 
                    className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                />

                {/* Info */}
                <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">{item.producto.nombre}</h4>
                    <p className="text-orange-600 font-bold text-sm">${item.producto.precio}</p>
                </div>

                {/* Controles de Cantidad */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                    <button 
                        onClick={() => subsItem(item.producto.id!)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-orange-600 active:scale-95 transition-all"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="font-bold text-gray-800 w-4 text-center">{item.cantidad}</span>
                    <button 
                        onClick={() => addItem(item.producto.id!)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-orange-600 active:scale-95 transition-all"
                    >
                        <Plus size={16} />
                    </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Total y Botón de Acción */}
        {productos && productos.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium">Total:</span>
                    <span className="text-2xl font-black text-orange-600">${total}</span>
                </div>
                
                <Button 
                    variant="primary" 
                    fullWidth 
                    onClick={openModalClienteCarrito} // Esto abre el modal de datos del cliente
                >
                    Confirmar Pedido <Send size={18} />
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};