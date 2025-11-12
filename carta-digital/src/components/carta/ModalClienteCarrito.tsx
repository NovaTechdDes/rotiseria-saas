import { useForm, useMutatePedidos, usePedidos } from '@/hooks';
import { ArrowLeft, CreditCard, House, Phone, Search, Truck, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/Button';
import { Pedido } from '@/interface';
import { useCarritoStore, usePedidoStore, useRotiseriaStore } from '@/store';

const initialState: Pedido = {
    cliente: '',
    direccion: '',
    telefono: '',
    vuelto: 0,
    observaciones: '',
    envio: "false",
    tipoPago: 'efectivo',
    estado: 'pendiente',
    total: 0,
    usuarioId: 0,
    rotiseriaId: 0,
    mostrar: true
}

export const ModalClienteCarrito = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    const { closeModalClienteCarrito, resetCarrito, total: totalCarrito, productos } = useCarritoStore()
    const { onInputChange, formState, onResetForm, rotiseriaId, total, estado, cliente, direccion, telefono, tipoPago, vuelto, observaciones, envio } = useForm(initialState);
    const [formularioValido, setFormularioValido] = useState<boolean>(false);
    const { agregarPedido } = useMutatePedidos();
    const { mutateAsync: agregar, isPending } = agregarPedido;

    useEffect(() => {
        if (cliente === '') return setFormularioValido(false);
        if (telefono === '') return setFormularioValido(false);

        if (envio === "true" && direccion === '') return setFormularioValido(false);

        setFormularioValido(true)
    }, [formState]);

    useEffect(() => {
        onInputChange({ target: { name: "total", value: totalCarrito } });
    }, [totalCarrito]);

    useEffect(() => {
        onInputChange({ target: { name: "rotiseriaId", value: rotiseriaActive ? rotiseriaActive?.id : 0 } });
    }, [rotiseriaActive]);

    useEffect(() => {
        onInputChange({
            target: {
                name: "productos",
                value: productos!
            }
        });
    }, [productos]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const ok = await agregar(formState);

        if (ok) {
            resetCarrito();
            onResetForm();
            closeModalClienteCarrito()
        };

    };

    useEffect(() => {
        if (!rotiseriaActive) return;
        onInputChange({ target: { name: "rotiseriaId", value: rotiseriaActive?.id } });
    }, [rotiseriaActive])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
            <div className="bg-white p-8 rounded-xl shadow-lg min-w-[600px] min-h-[250px] flex flex-col">
                <div className='flex justify-between'>
                    <h2 className='font-semibold text-xl text-orange-800'>Complete los datos para el pedido</h2>

                    <p className='flex gap-2 items-center hover:underline cursor-pointer text-orange-500'>
                        <ArrowLeft size={15} />
                        Volver
                    </p>
                </div>

                <form action="" className='grid grid-cols-2 gap-3' onSubmit={handleSubmit}>
                    <div className="flex flex-col w-full mt-6 col-span-2">
                        <label htmlFor="nombre" className='flex gap-2 mb-2 items-center'>
                            <User size={15} />
                            Nombre
                        </label>
                        <input
                            type="text"
                            onChange={onInputChange}
                            value={cliente}
                            name='cliente'
                            placeholder="Tu Nombre"
                            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                    </div>
                    <div className="flex flex-col w-full mt-6 col-span-2">
                        <label htmlFor="telefono" className='flex gap-2 mb-2 items-center'>
                            <Phone size={15} />
                            Telefono
                        </label>
                        <input
                            type="text"
                            onChange={onInputChange}
                            value={telefono}
                            name='telefono'
                            placeholder="3456123456"
                            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                    </div>
                    <div className="flex mt-6 flex-col">
                        <label htmlFor="envio" className='flex gap-2 mb-2 items-center'>
                            <Truck size={15} />
                            Modalidad *</label>
                        <select
                            onChange={onInputChange}
                            name='envio'
                            value={envio}
                            className="px-2 py-1 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300" >
                            <option value="false">Retiro en el local</option>
                            <option value="true">Envio a Domicilio</option>
                        </select>
                    </div>
                    <div className="flex mt-6 flex-col">
                        <label htmlFor="tipo" className='flex gap-2 mb-2 items-center'>
                            <CreditCard size={15} />
                            Tipo de Pago *</label>
                        <select
                            onChange={onInputChange}
                            name='tipoPago'
                            value={tipoPago}
                            className="px-2 py-1 text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300" >
                            <option value="efectivo">Efectivo</option>
                            <option value="transferencia">Transferencia</option>
                        </select>
                    </div>
                    {
                        formState.envio === "true" && (<div className="col-span-2 flex flex-col w-full mt-6">
                            <label htmlFor="direccion" className='flex gap-2 mb-2 items-center'>
                                <House size={15} />
                                Direccion
                            </label>
                            <input
                                type="text"
                                onChange={onInputChange}
                                value={direccion}
                                name='direccion'
                                placeholder="Av. Siempre Viva 123"
                                className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                        </div>)
                    }

                    <div className="flex flex-col w-full mt-6 col-span-2">
                        <label htmlFor="observaciones">Observaciones</label>
                        <textarea
                            onChange={onInputChange}
                            value={observaciones}
                            name='observaciones'
                            placeholder="Ej: Sin Cebolla, Dept. A, Tocar Timbre"
                            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                    </div>

                    {
                        (formState.envio === "true" && formState.tipoPago === 'efectivo') && (<div className="col-span-2 flex flex-col w-full mt-6">
                            <label htmlFor="direccion">¿Con cuanto vas a abonar? ¡Asi llevamos el cambio justo!</label>
                            <input
                                type="number"
                                onChange={onInputChange}
                                value={vuelto}
                                name='vuelto'
                                placeholder="0.00"
                                className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                        </div>)
                    }

                    <div className='col-span-2 mt-2'>
                        <Button texto={formularioValido ? isPending ? 'Confirmando...' : 'Confirmar Pedido' : 'Completar los campos obligatorios *'} tipo='primary' disabled={!formularioValido} />
                    </div>
                </form>
            </div>
        </div>
    )
};