'use client'
import SinPedidos from '@/components/dashboard/pedido/SinPedidos'
import { HeaderDashboard } from '@/components/dashboard/ui/HeaderDashboard'
import Loading from '@/components/ui/Loading'
import { usePedidos } from '@/hooks'
import { useRotiseriaStore } from '@/store'
import React from 'react'

const Pedido = () => {

    const { rotiseriaActive } = useRotiseriaStore();
    const { data: pedidos, isLoading } = usePedidos(rotiseriaActive ? rotiseriaActive.id : 0)

    const handleAdd = () => {

    };

    if (!pedidos) {
        return <Loading texto='Cargando Pedidos' />
    }

    return (
        <div className='text-black'>
            <HeaderDashboard titulo='Pedido' handleAdd={handleAdd} lista={pedidos} seccion='pedidos' textoBoton='Agregar Pedido' />

            {
                pedidos.length === 0 ? (
                    <SinPedidos />
                ) : (
                    pedidos?.map(pedido => (
                        <p>Hola</p>
                    ))
                )
            }
        </div>
    )
}

export default Pedido