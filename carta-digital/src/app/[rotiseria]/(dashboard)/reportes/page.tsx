
import HeaderReporte from '@/components/dashboard/reporte/HeaderReporte'
import { TarjetasReporte } from '@/components/dashboard/reporte/TarjetasReporte'
import TablaProductosReportes from '@/components/dashboard/reporte/TablaProductosReportes'
import { CobrosReporte } from '@/components/dashboard/reporte/CobrosReporte'


const Reporte = () => {

    return (
        <div className='text-black bg-[#e8e4e0]'>
            <HeaderReporte />


            <TarjetasReporte />

            <CobrosReporte />


            <div className='grid grid-cols-1 md:grid-cols-2'>
                <TablaProductosReportes />
            </div>
        </div>
    )
}

export default Reporte