import { useCarritoStore } from '@/store/useCarritoStore'
import { Send, ShoppingCart, X } from 'lucide-react';
import React from 'react'
import { ProductoModal } from './ProductoModal';
import { Button } from '../ui/Button';

export const ModalCarrito = () => {

    const { productos, closeModal, total, openModalClienteCarrito } = useCarritoStore();

    const handleModalClienteCarrito = () => {
        openModalClienteCarrito()
    };

    const handleCloseModal = () => {
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
            <div className="bg-white p-8 rounded-xl shadow-lg min-w-[600px] min-h-[250px] flex flex-col">
                <div className='flex justify-between  border-b pb-2 border-slate-300'>
                    <h2 className='text-2xl text-orange-500 items-center'>Tu Pedido</h2>
                    <X className='hover:opacity-80 cursor-pointer' onClick={handleCloseModal} />
                </div>
                {!productos
                    ? (
                        <div className='flex flex-col items-center mt-5 gap-5'>
                            <ShoppingCart size={50} className='text-orange-500' />
                            <p className='text-slate-500'>Tu Carrito esta vacio</p>
                        </div>
                    )
                    : (
                        productos.map(elem => (
                            <ProductoModal producto={elem.producto} cantidad={elem.cantidad} key={elem.producto.id} />
                        ))
                    )}
                {
                    productos && (
                        <>
                            <div className='flex justify-between mt-10'>
                                <p className='text-2xl text-slate-600 font-bold'>Total: </p>
                                <span className='text-2xl text-orange-500 font-semibold'>$ {total.toFixed(2)}</span>
                            </div>


                            <div className='w-full mt-10' onClick={handleModalClienteCarrito}>
                                <Button texto='Confirmar Pedido' icon={Send} tipo='primary' />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
