'use client'

import React, { useEffect } from 'react'
import { HeaderDashboard } from '@/components/dashboard/ui/HeaderDashboard'
import EgresoCard from '@/components/dashboard/egreso/EgresoCard'
import FiltroEgreso from '@/components/dashboard/egreso/FiltroEgreso'
import ModalEgreso from '@/components/dashboard/egreso/ModalEgreso'
import Loading from '@/components/ui/Loading'
import { useEgresos } from '@/hooks'
import { useEgresoStore, useRotiseriaStore } from '@/store'


const Egreso = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    const { modalAbierto, openModal, setTotal, desde, hasta, setBuscador, buscador } = useEgresoStore();
    const { data: egresos, isLoading } = useEgresos(desde, hasta);

    useEffect(() => {
        if (egresos) {
            const total = egresos
                .filter(egreso => egreso.descripcion.toUpperCase().includes(buscador))
                .reduce((acc, egreso) => acc + (egreso.importe || 0), 0);
            console.log(total)
            setTotal(total);
        };
    }, [egresos, buscador]);

    if (!rotiseriaActive) return;


    const handleAdd = () => {
        openModal();
    };

    return (
        <div className='text-black'>
            <HeaderDashboard lista={egresos?.filter(egreso => egreso.descripcion.toUpperCase().includes(buscador))} titulo='Egresos' handleAdd={handleAdd} seccion='egresos' textoBoton='Agregar Egreso' />

            <FiltroEgreso />

            <div>
                <input type="text" value={buscador} onChange={(e) => setBuscador(e.target.value)} name="buscador" id="buscador" className='border rounded-lg w-full border-gray-300 px-2 py-3' placeholder='Buscaro Egresos...' />
            </div>

            <div className='gap-5 flex flex-col mt-5'>
                {isLoading ? <Loading texto='Cargando Egresos' /> : egresos?.map(egreso => (
                    <EgresoCard buscador={buscador} egreso={egreso} key={egreso.id} />
                ))}
            </div>

            {modalAbierto && <ModalEgreso />}
        </div>
    )
}

export default Egreso