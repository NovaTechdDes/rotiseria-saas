import { Button } from '@/components/ui/Button';
import { useMutateCategorias } from '@/hooks';
import { Categoria } from '@/interface';
import { FolderOpen, SquarePen, Trash2 } from 'lucide-react';
import React from 'react';
import Swal from 'sweetalert2';

interface Props {
    categoria: Categoria
};

export const CategoriaElement = ({ categoria }: Props) => {
    const { eliminarCategoria, modificarCategoria } = useMutateCategorias();

    const { mutateAsync: eliminar, isPending } = eliminarCategoria;
    const { mutateAsync: modificar, isPending: isPendingModificar } = modificarCategoria;

    const handleDeleteCategoria = async () => {
        const { isConfirmed } = await Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            title: `Eliminar la categoria ${categoria.nombre}`
        });

        if (isConfirmed) {
            categoria.id && eliminar(categoria.id);
        };
    };

    const handleUpdateCategoria = async () => {
        const { isConfirmed, value } = await Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Modificar',
            input: 'text',
            title: `Modificar Categoria ${categoria.nombre}`,
            text: 'Nuevo nombre de la categoria',
        });

        if (isConfirmed) {
            modificar({ id: categoria.id, nombre: value });
        }
    };
    return (
        <div className='border flex flex-col gap-5 p-5 rounded-lg shadow-2xl border-gray-300 relative min-h-[120px]'>
            {isPending ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10">
                    <span className="text-orange-600 font-semibold text-lg animate-pulse">Eliminando categoría...</span>
                </div>
            ) : isPendingModificar ?
                (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10">
                        <span className="text-slate-600 font-semibold text-lg animate-pulse">Modificando categoría...</span>
                    </div>
                ) : (
                    <>
                        <div className='flex gap-5 items-center'>
                            <div>
                                <Button tipo='primary' icon={FolderOpen} />
                            </div>
                            <div>
                                <h2 className='text-lg font-semibold'>{categoria.nombre.toUpperCase()}</h2>
                            </div>
                        </div>
                        <div className='flex  gap-5'>
                            <div onClick={handleUpdateCategoria} className='flex-1'>
                                <Button texto='Editar' icon={SquarePen} />
                            </div>
                            <div onClick={handleDeleteCategoria}>
                                <Button icon={Trash2} tipo='delete' />
                            </div>
                        </div>
                    </>
                )}
        </div>
    )
}
