import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import React from 'react'
import { TablaUsuarios } from './TablaUsuarios'
import { HeaderUsuario } from './HeaderUsuario'

export const Usuario = () => {
    return (

        <div className='m-2 rounded-lg p-5 bg-white'>
            <HeaderUsuario />


            <TablaUsuarios />
        </div>
    )
}
