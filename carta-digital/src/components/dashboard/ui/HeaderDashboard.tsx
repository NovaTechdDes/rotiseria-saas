import { Button } from '@/components/ui/Button'
import { Categoria, Egreso, Pedido, Producto } from '@/interface'
import { Plus } from 'lucide-react';
import React from 'react'

interface Props {
    lista: Categoria[] | Producto[] | Pedido[] | Egreso[] | undefined;
    handleAdd: () => void;
    seccion: string;
    textoBoton: string;
    titulo: string;

}

export const HeaderDashboard = ({ lista = [], handleAdd, seccion, titulo, textoBoton = '' }: Props) => {
    return (
        <header className='flex justify-between items-center'>
            <div>
                <h1 className='text-3xl font-semibold text-orange-500'>{titulo}</h1>
                <p className='text-lg'>Total: {lista?.length} {seccion}</p>
            </div>

            <div className='rounded-lg' onClick={handleAdd}>
                <Button texto={textoBoton} icon={Plus} tipo='primary' />
            </div>
        </header>
    )
}
