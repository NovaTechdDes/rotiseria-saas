import { useReportesForDate } from '@/hooks/reportes/useReportesForDate'
import { useReporteStore, useRotiseriaStore } from '@/store';
import React from 'react'
import { ReporteCard } from './ReporteCard';
import Loading from '@/components/ui/Loading';
import { TrendingDown, TrendingUp } from 'lucide-react';

export const TarjetasReporte = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    const { desde, hasta } = useReporteStore();

    const { data, isLoading } = useReportesForDate(desde, hasta, rotiseriaActive?.id ?? 0);

    if (isLoading || !data) {
        return <Loading texto='Cargando Datos...' />
    }

    return (
        <div className='grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-4'>
            <ReporteCard icon={TrendingUp} categoria='Ingreso' subtitulo='Total de pedidios' texto={data.total_importe} />
            <ReporteCard icon={TrendingDown} categoria='Egreso' subtitulo='Total de egresos' texto={data.total_gasto} />
            <ReporteCard categoria='Ganancia Neta' subtitulo='Ingresos - Egresos' texto={data.ganancia_neta} />
            <ReporteCard categoria='Margen de Ganancia' subtitulo='% sobre Ingresos totales' texto={data.margen} porcentaje />
        </div>
    )
}
