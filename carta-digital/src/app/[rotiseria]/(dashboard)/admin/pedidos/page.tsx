'use client';
import React from 'react';
import { usePedidos } from '@/hooks/pedidos/usePedidos';
import { useMutatePedidos } from '@/hooks/pedidos/useMutatePedidos';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import { PedidoCard } from '@/components/dashboard/pedidos/PedidoCard';
import Loading from '@/components/ui/Loading';
import Swal from 'sweetalert2';
import { ShoppingBag } from 'lucide-react';

const PedidosPage = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    
    // Traemos los pedidos de la base de datos
    const { data: pedidos, isLoading } = usePedidos(rotiseriaActive?.id || 0);
    
    // Traemos las funciones para modificar (Editar Estado / Eliminar)
    const { modificarPedido, eliminarPedido } = useMutatePedidos();

    // Manejador para cambiar estado
    const handleEstadoChange = (id: number, nuevoEstado: string) => {
        modificarPedido.mutate({ id, estado: nuevoEstado });
        // No hace falta recargar, React Query actualiza solo
    };

    // Manejador para eliminar con confirmación
    const handleDelete = (id: number) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarPedido.mutate(id);
                Swal.fire('Eliminado!', 'El pedido ha sido eliminado.', 'success');
            }
        });
    };

    if (isLoading) return <Loading texto="Cargando pedidos..." />;

    return (
        <div>
            {/* Header de la Página */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-orange-800 flex items-center gap-3">
                    <ShoppingBag className="text-orange-600" />
                    Pedidos
                </h1>
                <p className="text-gray-500 mt-1">
                    Total: <span className="font-bold text-gray-800">{pedidos?.length || 0} pedidos</span>
                </p>
            </div>

            {/* Lista de Pedidos */}
            {pedidos && pedidos.length > 0 ? (
                <div className="max-w-4xl">
                    {pedidos.map((pedido) => (
                        <PedidoCard 
                            key={pedido.id} 
                            pedido={pedido}
                            onEstadoChange={handleEstadoChange}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                // Estado Vacío (Empty State)
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="bg-orange-50 p-4 rounded-full mb-4">
                        <ShoppingBag size={40} className="text-orange-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No hay pedidos registrados</h3>
                    <p className="text-gray-500">Los pedidos nuevos aparecerán aquí automáticamente.</p>
                </div>
            )}
        </div>
    );
};

export default PedidosPage;