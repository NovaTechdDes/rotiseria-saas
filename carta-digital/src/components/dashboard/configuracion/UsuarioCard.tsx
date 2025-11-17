import { Usuario } from '@/interface'
import { Check, Clock, Pen, Trash2, X } from 'lucide-react';
import React from 'react'
import Swal from 'sweetalert2';

interface Props {
    usuario: Usuario
};

export const UsuarioCard = ({ usuario }: Props) => {
    const { email, estado, nombre, rol } = usuario;

    const handleDelete = async () => {
        const { isConfirmed } = await Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar'
        });

        if (isConfirmed) {

        }

    }


    const tdEstado = () => {
        if (estado === 'Pendiente') {
            return (
                <div className='inline-flex gap-2 bg-yellow-200 text-yellow-800 items-center justify-center rounded-lg p-2 text-xs'>
                    <Clock size={15} />
                    <p>{estado}</p>
                </div>
            )
        } else if (estado === 'Activo') {
            return (
                <div className='inline-flex gap-2 bg-green-200 text-green-800 items-center justify-center rounded-lg p-2 text-xs'>
                    <Check size={15} />
                    <p>{estado}</p>
                </div>
            )
        } else if (estado === 'Inactivo') {
            return (
                <div className='inline-flex gap-2 bg-red-200 text-red-800 items-center justify-center rounded-lg p-2 text-xs'>
                    <X size={15} />
                    <p>{estado}</p>
                </div>
            )
        }
    }

    return (
        <tr className='text-center border-b border-gray-400'>
            <td className='my-2 py-4 font-semibold'>{nombre}</td>
            <td>{email}</td>
            <td>{rol}</td>
            <td>{tdEstado()}</td>
            <td>
                <div className='flex gap-5 items-center justify-center'>
                    <Pen className='hover:bg-gray-200 rounded-sm p-1 cursor-pointer' size={25} />
                    <Trash2 className='text-red-500 p-1 hover:bg-red-200 rounded-lg cursor-pointer' size={25} onClick={handleDelete} />
                </div>
            </td>
        </tr>
    )
}
