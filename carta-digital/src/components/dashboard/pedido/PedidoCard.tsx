import { Button } from '@/components/ui/Button';
import { useMutatePedidos } from '@/hooks';
import { Pedido } from '@/interface'
import { Clock, DeleteIcon, Phone, Trash2, User } from 'lucide-react';
import React from 'react'
import Swal from 'sweetalert2';

interface Props {
    pedido: Pedido
}

const PedidoCard = ({ pedido }: Props) => {
    const { cliente, id, direccion, envio, estado, observaciones, telefono, movProductos, tipoPago, vuelto, created_at, total, mostrar } = pedido;
    const { eliminarPedido, modificarPedido } = useMutatePedidos();
    const { mutateAsync: eliminar, isPending } = eliminarPedido;
    const { mutateAsync: modificar, isPending: isPendingModificar } = modificarPedido;

    if (!mostrar) return;

    const handleDelete = async () => {
        const { isConfirmed } = await Swal.fire({
            title: 'Quiere Eliminar el pedido',
            showCancelButton: true,
            confirmButtonText: 'Eliminar'
        });

        if (isConfirmed && id) {
            eliminar(id)
        }
    };

    const changeEstado = (texto: string) => {
        const { estado, ...pedidioSinEstado } = pedido
        modificar({ estado: texto, ...pedidioSinEstado })
    };

    return (
        <div className=' border flex gap-10 shadow-2xl rounded-lg border-gray-300 p-5'>

            <div className='flex-1'>
                <div className='flex gap-3 items-center'>
                    <Clock size={15} />
                    <p className='text-gray-500'>
                        {created_at ? new Date(new Date(created_at).getTime()).toLocaleString() : ''}
                    </p>
                </div>

                <div className='flex gap-3 items-center'>
                    <User size={15} />
                    <p>{cliente}</p>
                </div>

                <div className='flex gap-3 items-center'>
                    <Phone size={15} />
                    <p>{telefono}</p>
                </div>

                <div className='mt-2'>
                    <p>Productos: </p>
                    <div>
                        {movProductos?.map(movProducto => (
                            <div key={movProducto.id} className='text-orange-500 bg-gray-200/80 p-1 rounded-lg flex justify-between w-full'>
                                <p>{movProducto?.descripcion} X{movProducto.cantidad}</p>
                                <p>${movProducto?.precioUnitario.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <p className='text-xl text-orange-700 font-semibold mt-2'>Total: ${total}</p>
                </div>
            </div>


            <div className='flex flex-col justify-between'>
                <div className='flex gap-2 mb-5'>
                    <Button
                        disabled={isPendingModificar && estado === 'pendiente'}
                        onClick={() => {
                            if (!isPendingModificar || estado === 'pendiente') {
                                changeEstado('pendiente')
                            }
                        }}
                        texto={isPendingModificar && estado === 'pendiente' ? 'Modificando...' : 'Pendiente'}
                        tipo={estado === 'pendiente' ? 'primary' : ''}
                    />
                    <Button
                        disabled={isPendingModificar && estado === 'preparado'}
                        onClick={() => {
                            if (!isPendingModificar || estado === 'preparado') {
                                changeEstado('preparado')
                            }
                        }}
                        texto={isPendingModificar && estado === 'preparado' ? 'Modificando...' : 'Preparado'}
                        tipo={estado === 'preparado' ? 'primary' : ''}
                    />
                    <Button
                        disabled={isPendingModificar && estado === 'enviado'}
                        onClick={() => {
                            if (!isPendingModificar || estado === 'enviado') {
                                changeEstado('enviado')
                            }
                        }}
                        texto={isPendingModificar && estado === 'enviado' ? 'Modificando...' : 'Enviado'}
                        tipo={estado === 'enviado' ? 'primary' : ''}
                    />
                    <Button
                        disabled={isPendingModificar && estado === 'entregado'}
                        onClick={() => {
                            if (!isPendingModificar || estado === 'entregado') {
                                changeEstado('entregado')
                            }
                        }}
                        texto={isPendingModificar && estado === 'entregado' ? 'Modificando...' : 'Entregado'}
                        tipo={estado === 'entregado' ? 'primary' : ''}
                    />
                </div>
                <div onClick={handleDelete}>
                    <Button icon={Trash2} texto='Eliminar Pedido' tipo='delete' />
                </div>
            </div>

        </div>
    )
}

export default PedidoCard