'use client'
import { Button } from '@/components/ui/Button'
import { useUsuarioStore } from '@/store/useUserStore'
import { Plus } from 'lucide-react'
import React from 'react'

export const HeaderUsuario = () => {

    const { openModal } = useUsuarioStore();

    return (
        <div className='flex justify-between'>
            <h3 className='text-2xl'>Usuarios</h3>
            <div>
                {/* <Button icon={Plus} texto='Agregar Usuario' tipo='primary' onClick={openModal} /> */}
            </div>
        </div>
    )
}
