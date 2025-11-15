'use client'
import React from 'react'
import { useTipoEgresos } from '@/hooks'
import { TipoEgresoCard } from './TipoEgresoCard';

export const TablaTipoEgreso = () => {
    const { data: TipoEgresos, isLoading } = useTipoEgresos();
    return (
        <div className='w-full mt-7 '>
            <table className='w-full '>
                <thead>
                    <tr className='border-b border-gray-300'>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>{
                    TipoEgresos?.map((tipo, index) => (
                        <TipoEgresoCard key={tipo.id} index={index + 1} tipo={tipo} />
                    ))
                }</tbody>
            </table>
        </div>
    )
}
