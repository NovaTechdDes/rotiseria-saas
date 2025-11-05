import { useProductos, useRotiseriaByDominio } from '@/hooks';
import { Rotiseria } from '@/interface/Rotiseria';
import React from 'react'
import ProductCard from './ProductCard';

interface Props {
    rotiseria: Rotiseria;
};

//TODO BUSCADOR

export const Productos = ({ rotiseria }: Props) => {

    const { data: productos, isLoading } = useProductos(rotiseria.id);


    if (isLoading) {
        return <div>Cargando ....</div>
    }

    return (
        <div className='grid mx-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {productos?.map(producto => (
                <ProductCard producto={producto} key={producto.id} />
            ))}
        </div>
    )
}
