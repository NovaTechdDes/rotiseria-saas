'use client'
import { useUsuarios } from '@/hooks/auth/useUsuarios'
import { useRotiseriaStore } from '@/store';
import React from 'react'
import { UsuarioCard } from './UsuarioCard';
import { ModalAgregrarUsuario } from './ModalAgregrarUsuario';
import { useUsuarioStore } from '@/store/useUserStore';

export const TablaUsuarios = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    const { data, error } = useUsuarios(rotiseriaActive ? rotiseriaActive.id : 0);
    const { openModal, modalAbierto } = useUsuarioStore();


    return (
        <div className='mt-7 w-full'>
            <table className='w-full'>
                <thead>
                    <tr className='border-b border-gray-300'>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(usuario => (
                        <UsuarioCard usuario={usuario} key={usuario.id} />
                    ))}
                </tbody>
            </table>

            {modalAbierto && <ModalAgregrarUsuario />}
        </div>
    )
}
