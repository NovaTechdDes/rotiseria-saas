import { useReportesMostPopularProducto } from '@/hooks/reportes/useReportesMostPopularProducto'
import { useReporteStore, useRotiseriaStore } from '@/store'
import React from 'react'



const TablaProductosReportes = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    const { desde, hasta } = useReporteStore();
    const { data, isLoading } = useReportesMostPopularProducto(desde, hasta, rotiseriaActive?.id ?? 0);
    console.log(data)

    return (
        <div className='bg-white m-5 rounded-lg'>
            <h3 className='px-5 mb-2 text-lg font-semibold mt-2'>Top 10 productos Mas vendidos</h3>

            <div className='flex flex-col gap-5'>
                {
                    data?.map((elem, index) => (
                        <div className='flex px-5 border-b border-gray-300 py-2 gap-4'>
                            <p className='text-orange-500 bg-orange-200 font-semibold rounded-full p-2 w-10 h-10 flex items-center justify-center'>{index + 1}</p>

                            <div>
                                <p className='font-semibold'>{elem.descripcion}</p>
                                <p className='text-gray-500'>{elem.cantidad_total} unidades vendidas</p>
                            </div>

                            <div className='ml-auto'>
                                <p className='text-lg font-bold'>${elem.total_vendido.toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TablaProductosReportes