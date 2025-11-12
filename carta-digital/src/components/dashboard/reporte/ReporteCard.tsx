import { LucideIcon } from 'lucide-react';
import React from 'react'

interface Props {
    texto: string;
    subtitulo: string;
    categoria: string;
    icon?: LucideIcon;
    porcentaje?: boolean;
}

export const ReporteCard = ({ icon: Icon, subtitulo, texto, categoria, porcentaje }: Props) => {
    return (
        <div className='bg-white border h-36 border-gray-300 rounded-lg p-5 flex flex-col justify-between'>
            <div className='flex gap-2'>
                {Icon && <Icon className="w-6 h-6 text-green-500" />}
                <p className='text-gray-500'>{categoria}</p>
            </div>
            <div>
                <p className={`text-2xl font-semibold ${parseFloat(texto) > 0 ? 'text-green-600' : 'text-red-600'}`}>{porcentaje ? '' : '$'} {parseFloat(texto).toFixed(2)}{porcentaje ? '%' : ''}</p>
                <p className='text-sm text-gray-500'>{subtitulo}</p>
            </div>
        </div>
    )
}
