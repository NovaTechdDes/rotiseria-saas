'use client'
import React, { useEffect } from 'react'

import { Button } from '@/components/ui/Button'
import { useForm } from '@/hooks'
import { useUsuarioStore } from '@/store/useUserStore'
import { Plus, X } from 'lucide-react'
import { Usuario } from '@/interface'
import { useMutateUsuarios } from '@/hooks/usuarios/useMutateUsuarios'
import { useRotiseriaStore } from '@/store'

const initialState: Usuario = {
    email: '',
    estado: 'Pendiente',
    nombre: '',
    rol: 'empleado',
    rotiseriaId: 0

}

export const ModalAgregrarUsuario = () => {

    const { rotiseriaActive } = useRotiseriaStore();
    const { cerrarModal } = useUsuarioStore();
    const { email, estado, nombre, rol, rotiseriaId, formState, onInputChange, onResetForm } = useForm(initialState);
    const { agregarUsuarioMutation } = useMutateUsuarios();
    const { mutateAsync: agregar, isPending } = agregarUsuarioMutation;

    useEffect(() => {
        console.log(rotiseriaActive)
        if (rotiseriaActive?.id) {
            onInputChange({ target: { name: 'rotiseriaId', value: rotiseriaActive.id } });
        }
    }, [rotiseriaActive])

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const ok = await agregar(formState);

        if (ok) {
            onResetForm();
            cerrarModal();
        }

    };

    const closeModal = () => {
        onResetForm();
        cerrarModal();
    }

    return (

        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 ">
            <div className="bg-white p-8 rounded shadow-lg min-w-[500px]">
                <div className='flex justify-between gap-2 text-2xl'>
                    <h3>Agregar Usuario</h3>
                    <X className='hover:scale-110 hover:bg-gray-200 cursor-pointer rounded-lg' onClick={closeModal} />
                </div>

                <form onSubmit={handleAdd} className='mt-5'>
                    <div className='flex flex-col gap-2 mb-3 text-xl'>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={onInputChange} className='border border-gray-300 rounded-lg p-2 ' placeholder='ejemplo@outlook.com' type="email" name="email" id="email" />
                    </div>

                    <div className='flex flex-col gap-2 mb-3 text-xl'>
                        <label htmlFor="nombre">Nombre</label>
                        <input value={nombre} onChange={onInputChange} className='border border-gray-300 rounded-lg p-2 ' placeholder='Usuario' type="text" name="nombre" id="nombre" />
                    </div>

                    <div className='flex flex-col gap-2 mb-3 text-xl'>
                        <label htmlFor="">Rol</label>
                        <select value={rol} onChange={onInputChange} name="rol" id="rol" className='border border-gray-300 rounded-lg p-2'>
                            <option value="">---Seleccionar una Opcion---</option>
                            <option value="admin">Admin</option>
                            <option value="empleado">Empleado</option>
                        </select>
                    </div>

                    <div className='flex gap-2 pt-5'>
                        <Button texto='Cancelar' onClick={closeModal} />
                        <Button texto={isPending ? 'Agregando...' : 'Agregar'} disabled={isPending} tipo='primary' />
                    </div>

                </form>
            </div>
        </div>
    )
}
