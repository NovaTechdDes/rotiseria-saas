'use client'

import React from 'react'
import { useCategorias, useRotiseriaByDominio } from '@/hooks';
import { Button } from '../ui/Button';
import '../../styles/global.css'
import { useCategoriaStore } from '@/store/useCategoriaStore';
import { Rotiseria } from '@/interface/Rotiseria';

interface Props {
    rotiseria: Rotiseria;
};

export const Categorias = ({ rotiseria }: Props) => {

    const { data: categorias, isLoading } = useCategorias(rotiseria && typeof rotiseria !== 'boolean' ? rotiseria.id : 0);

    const { setCategoriaSeleccionada, categoriaSeleccionada } = useCategoriaStore();

    const handleChangeCategoria = (id: number) => {
        setCategoriaSeleccionada(id)
    }

    return (
        <div className=' py-5 px-5 flex gap-2 overflow-x-scroll'>
            <div className='bg-white rounded-lg' onClick={e => handleChangeCategoria(0)}>
                <Button
                    texto='TODOS'
                    key='0'
                    tipo={categoriaSeleccionada === 0 ? 'primary' : undefined}
                />
            </div>
            {categorias?.map(categoria => (
                <div className='bg-white rounded-lg' onClick={e => handleChangeCategoria(categoria.id ?? 0)} key={`${categoria.id}`}>
                    <Button texto={categoria.nombre.toUpperCase()} tipo={categoriaSeleccionada === categoria.id ? 'primary' : undefined} />
                </div>
            ))}
        </div>
    )
}
