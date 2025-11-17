'use client';

import { useReporteStore } from '@/store'
import React from 'react'

const HeaderReporte = () => {

    const { desde, hasta, setDesde, setHasta } = useReporteStore();

    const handleDesde = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesde(e.target.value);
    };

    const handleHasta = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasta(e.target.value);
    };

    return (
        <header className='flex flex-col p-5 '>
            <div>
                <h1 className='text-3xl font-semibold text-orange-500'>Reportes</h1>
                <p className='text-gray-500'>Analisis detallado de tu negocio</p>
            </div>

            <div className='w-full bg-white grid grid-cols-2 p-2 gap-10 mt-2 rounded-lg'>
                <div className='flex flex-col'>
                    <label className='text-gray-700' htmlFor="desde">Desde</label>
                    <input value={desde} onChange={handleDesde} className='border text-lg w-full p-2 rounded-lg border-gray-300' type="date" name="desde" id="desde" />
                </div>

                <div className='flex flex-col'>
                    <label className='text-gray-700' htmlFor="hasta">Hasta</label>
                    <input value={hasta} onChange={handleHasta} className='border text-lg w-full p-2 rounded-lg border-gray-300' type="date" name="hasta" id="hasta" />
                </div>
            </div>
        </header>
    )
}

export default HeaderReporte