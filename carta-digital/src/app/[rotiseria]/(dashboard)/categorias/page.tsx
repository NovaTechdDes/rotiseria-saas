'use client'
import { CategoriaElement } from '@/components/dashboard/categoria/CategoriaElement';
import { Button } from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { useCategorias, useMutateCategorias } from '@/hooks'
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import { Plus } from 'lucide-react';
import React from 'react'
import Swal from 'sweetalert2';

const Categoria = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    const { data: categorias, isLoading } = useCategorias(rotiseriaActive ? rotiseriaActive.id : 0);
    const { agregarCategoria } = useMutateCategorias();
    const { mutateAsync: agregar, isPending } = agregarCategoria;

    const handleAdd = async () => {
        const { isConfirmed, value } = await Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Modificar',
            input: 'text',
            title: `Agregar Categoria`,
            text: 'Nombre de la categoria',
        });

        if (isConfirmed && rotiseriaActive) {
            agregar({ nombre: value, rotiseriaId: rotiseriaActive?.id });
        };
    }

    if (isLoading) {
        return <Loading texto='Cargando Categorias...' />
    }

    return (
        <div className='text-black relative'>
            {isPending && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-20">
                    <span className="text-orange-600 font-semibold text-lg animate-pulse">Agregando categoría...</span>
                </div>
            )}
            <header className='flex justify-between items-center'>
                <div>
                    <h1 className='text-3xl font-semibold text-orange-500'>Categorias</h1>
                    <p className='text-lg'>Total: {categorias?.length} categorias</p>
                </div>

                <div className='rounded-lg' onClick={handleAdd}>
                    <Button texto='Nueva Categoria' icon={Plus} tipo='primary' />
                </div>
            </header>
            <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 gap-5'>
                {categorias?.map(categoria => (
                    <CategoriaElement categoria={categoria} key={categoria.id} />
                ))}
            </main>
        </div>
    )
}

export default Categoria