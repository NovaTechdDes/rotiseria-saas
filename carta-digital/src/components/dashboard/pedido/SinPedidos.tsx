import { Info } from 'lucide-react'
import React from 'react'

const SinPedidos = () => {
    return (
        <div className="flex flex-col w-full py-12">
            <div className="bg-white rounded-lg shadow-md px-8 py-6 flex flex-col items-center">
                <Info size={100} color='gray' className='mb-5' />
                <h2 className="text-2xl font-semibold text-slate-500 mb-2">No hay pedidos registrados</h2>

            </div>
        </div>
    )
}

export default SinPedidos