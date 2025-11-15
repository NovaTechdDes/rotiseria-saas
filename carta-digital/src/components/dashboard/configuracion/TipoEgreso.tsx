'use client'

import React from 'react'
import { useMutateTipoEgresos } from '@/hooks'
import { TablaTipoEgreso } from './TablaTipoEgreso'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import Swal from 'sweetalert2'
import { useRotiseriaStore } from '@/store'

export const TipoEgreso = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    const { agregarTipoEgreso } = useMutateTipoEgresos();
    const { mutateAsync: agregar, isPending } = agregarTipoEgreso;

    const handleAdd = async () => {
        const { isConfirmed, value } = await Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            title: 'Ingresar Nombre del tipo de egreso',
            input: 'text'
        });

        if (isConfirmed && rotiseriaActive) {
            agregar({ nombre: value, rotiseriaId: rotiseriaActive.id })
        }
    };

    return (
        <div className='m-2 rounded-lg p-5 bg-white'>
            <div className='flex justify-between'>
                <h3 className='text-2xl'>Tipo de Egresos</h3>

                <div>
                    <Button icon={Plus} texto='Agregar Tipo' onClick={handleAdd} tipo='primary' />
                </div>
            </div>


            <TablaTipoEgreso />
        </div>
    )
}
