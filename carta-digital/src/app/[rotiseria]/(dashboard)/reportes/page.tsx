'use client'

import React, { useEffect } from 'react'
import { HeaderDashboard } from '@/components/dashboard/ui/HeaderDashboard'
import EgresoCard from '@/components/dashboard/egreso/EgresoCard'
import FiltroEgreso from '@/components/dashboard/egreso/FiltroEgreso'
import ModalEgreso from '@/components/dashboard/egreso/ModalEgreso'
import Loading from '@/components/ui/Loading'
import { useEgresos } from '@/hooks'
import { useEgresoStore, useRotiseriaStore } from '@/store'
import HeaderReporte from '@/components/dashboard/reporte/HeaderReporte'
import { TarjetasReporte } from '@/components/dashboard/reporte/TarjetasReporte'
import TablaProductosReportes from '@/components/dashboard/reporte/TablaProductosReportes'


const Reporte = () => {

    return (
        <div className='text-black bg-[#e8e4e0]'>
            <HeaderReporte />


            <TarjetasReporte />


            <div className='grid grid-cols-1 md:grid-cols-2'>
                <TablaProductosReportes />
            </div>
        </div>
    )
}

export default Reporte