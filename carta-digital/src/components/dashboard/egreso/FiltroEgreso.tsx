import { useEgresoStore } from '@/store';
import React from 'react';

const FiltroEgreso = () => {

    const { desde, hasta, setDesde, setHasta, total } = useEgresoStore();

    const handleChangeDesde = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesde(e.target.value);
    };

    const handleChangeHasta = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasta(e.target.value);
    };

    return (
        <div className='flex justify-between border border-gray-300 rounded-lg my-5 p-5'>

            <div>
                <p>Total de egresos</p>
                <p className='text-xl text-orange-500 font-bold'>${total.toFixed(2)}</p>
            </div>

            <div className='flex  gap-2'>
                <div className='flex flex-col'>
                    <label htmlFor="desde">Desde</label>
                    <input value={desde} onChange={handleChangeDesde} type="date" name="desde" id="desde" className='border p-1 rounded-lg border-gray-300' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="hasta">Hasta</label>
                    <input value={hasta} onChange={handleChangeHasta} type="date" name="hasta" id="hasta" className='border p-1 rounded-lg border-gray-300' />
                </div>
            </div>

        </div>
    )
}

export default FiltroEgreso