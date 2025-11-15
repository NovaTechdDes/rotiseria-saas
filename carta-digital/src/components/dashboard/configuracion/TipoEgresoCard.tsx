import { useMutateTipoEgresos } from '@/hooks';
import { TipoEgreso } from '@/interface'
import { Pen, Trash2 } from 'lucide-react';
import React from 'react'
import Swal from 'sweetalert2';

interface Props {
    tipo: TipoEgreso,
    index: number
};

export const TipoEgresoCard = ({ tipo, index }: Props) => {
    const { nombre, id } = tipo;
    const { eliminarTipoEgreso, modificarTipoEgreso } = useMutateTipoEgresos();
    const { mutateAsync: eliminar, isPending: isPendingEliminar } = eliminarTipoEgreso;
    const { mutateAsync: modificar, isPending: isPendingModificar } = modificarTipoEgreso;

    const handleDelete = async () => {
        const { isConfirmed } = await Swal.fire({
            title: `Eliminar el tipo de Egreso ${nombre}?`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar'
        });

        if (isConfirmed && id) {
            const ok = await eliminar(id);


            if (ok) {
                //Todo de mensaje de eliminar abajo a la derecha
                console.log("Eleminado")
            }
        };
    };

    const handlePut = async () => {
        const { isConfirmed, value } = await Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Modificar',
            title: `Modfificar Nombre del tipo de egreso ${nombre}`,
            input: 'text',
        });

        if (isConfirmed) {
            modificar({ nombre: value, id })
        }
    }

    return (
        <tr className='text-center '>
            <td className='my-2 py-2 font-semibold '>{index}</td>
            <td className='my-2 py-2 font-semibold '>{nombre}</td>
            <td className='my-2 py-2'>
                <div className='flex gap-5 items-center justify-center'>
                    <Pen onClick={handlePut} className='hover:bg-gray-200 rounded-sm p-1 cursor-pointer' size={25} />
                    {isPendingEliminar ? (
                        <span className="text-red-500 font-semibold">Eliminando...</span>
                    ) : (
                        <Trash2 onClick={handleDelete} className='text-red-500 p-1 hover:bg-red-200 rounded-lg cursor-pointer' size={25} />
                    )}
                </div>
            </td>
        </tr>
    )
}
