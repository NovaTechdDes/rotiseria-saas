import { useMutateEgresos } from '@/hooks'
import { Egreso } from '@/interface'
import { useEgresoStore } from '@/store'
import { Dot, Pen, Trash2 } from 'lucide-react'
import React from 'react'
import Swal from 'sweetalert2'

interface Props {
    egreso: Egreso;
    buscador?: string;
};

const EgresoCard = ({ egreso, buscador = '' }: Props) => {
    const { id, importe, descripcion, TipoEgreso, created_at } = egreso;
    const { openModal } = useEgresoStore();
    const { eliminarEgreso } = useMutateEgresos();
    const { mutateAsync: eliminar, isPending: isPendingEliminar } = eliminarEgreso;

    const handleDelete = async () => {
        const { isConfirmed } = await Swal.fire({
            title: `Eliminar egreso ${descripcion}?`,
            showCancelButton: true,
            confirmButtonText: 'Aceptar'
        });

        if (isConfirmed && id) {
            eliminar(id);
        };
    };

    const handlePut = async () => {
        openModal(egreso);
    };

    if (isPendingEliminar) {
        return (
            <div className='border border-gray-300 rounded-lg px-5 py-3 flex justify-center'>
                <span className='text-gray-500 italic'>Eliminando...</span>
            </div>
        )
    };

    if (!descripcion.toUpperCase().includes(buscador)) return;

    return (
        <div className='border border-gray-300 rounded-lg px-5 py-3 flex justify-between'>
            <div className='flex flex-col gap-1'>

                <h2 className='text-lg font-semibold'>{descripcion}</h2>

                <p className='text-gray-500 text-sm flex'>
                    <span>{TipoEgreso?.nombre}</span>
                    <Dot />
                    <span>{created_at?.toLocaleString().slice(0, 10).split('-', 3).reverse().join('/') ?? '00/00/0000'}</span>
                </p>
            </div>

            <div className='flex gap-5 items-center'>
                <p className='text-xl text-orange-500 font-semibold'>$ {importe.toFixed(2)}</p>
                <Pen size={20} className='cursor-pointer' onClick={handlePut} />
                <Trash2 size={20} color='red' className='cursor-pointer' onClick={handleDelete} />
            </div>
        </div>
    )
}

export default EgresoCard