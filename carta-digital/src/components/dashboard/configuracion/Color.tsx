import React from 'react'
import ColorCard from './ColorCard'
import { ColorActual } from './ColorActual'

export const Color = () => {
    return (
        <div className='mx-2 bg-white rounded-lg p-5'>
            <h3 className='text-2xl font-semibold'>Personalizar color principal</h3>
            <p className='text-gray-500 my-2'>Seleccione un color para su rotiseria. Este color se aplicara a botones, encabezados y elementos destacados</p>

            <div className='grid grid-cols-3 md:grid-cols-9 gap-5 my-5'>
                <ColorCard color='#e65100' texto='Naranja' />
                <ColorCard color='#dc2626' texto='Rojo' />
                <ColorCard color='#2563eb' texto='Azul' />
            </div>

            <ColorActual />


        </div>
    )
}
