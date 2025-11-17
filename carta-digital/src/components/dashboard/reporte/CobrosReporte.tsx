'use client'
import React from 'react'
import { TarjetasReporte } from './TarjetasReporte'
import { ReporteCard } from './ReporteCard'
import { useReportesTipoPagosPedido } from '@/hooks/reportes/useReportesTipoPagosPedidos'
import { useReporteStore, useRotiseriaStore } from '@/store'
import Loading from '@/components/ui/Loading'
import { Banknote, CreditCard } from 'lucide-react'

export const CobrosReporte = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    const { desde, hasta } = useReporteStore();

    const { data, isLoading } = useReportesTipoPagosPedido(desde, hasta, rotiseriaActive?.id ?? 0);


    return (
        <div className='grid grid-cols-1 mx-5 sm:grid-cols-2 gap-5'>
            {isLoading
                ? (<Loading texto='Cargando...' />)
                : (
                    data?.map(elem => (
                        <ReporteCard
                            colorIcon={elem.tipo === 'transferencia' ? 'text-blue-500' : 'text-green-500'}
                            categoria={`Ventas en ${elem.tipo[0].toUpperCase()}${elem.tipo.slice(1)}`}
                            texto={elem.importe.toString()}
                            subtitulo={`Cantidad de ventas: ${elem.cant}`}
                            icon={elem.tipo === 'efectivo' ? Banknote : CreditCard}
                        />
                    ))
                )
            }
        </div>
    )
}
