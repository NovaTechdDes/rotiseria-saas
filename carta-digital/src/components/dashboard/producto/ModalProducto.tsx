import { useCategorias, useForm, useMutateProductos } from '@/hooks'
import { Producto } from '@/interface'
import { useProductoStore } from '@/store'
import { useRotiseriaStore } from '@/store/useRotiseriaStore'
import { X } from 'lucide-react'
import React, { useEffect, useEffectEvent } from 'react'

const initialState: Producto = {
    activo: true,
    descripcion: '',
    categoriaId: 0,
    nombre: '',
    precio: 0,
    rotiseriaId: 0
}

export const ModalProducto = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    const { closeModal, productoSeleccionada } = useProductoStore();
    const { activo, descripcion, categoriaId, nombre, precio, rotiseriaId, onInputChange, onResetForm, formState } = useForm(productoSeleccionada ?? initialState);
    const { data: categrias } = useCategorias(rotiseriaActive ? rotiseriaActive.id : 0);
    const { agregarProducto, modificarProducto } = useMutateProductos();
    const { mutateAsync: agregar, isPending } = agregarProducto;
    const { mutateAsync: modificar, isPending: isPendingModificar } = modificarProducto;


    useEffect(() => {
        if (!rotiseriaActive) return;
        onInputChange({ target: { name: "rotiseriaId", value: rotiseriaActive?.id } });
    }, [rotiseriaActive])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const ok = await agregar(formState);

        if (ok) {
            onResetForm();
            closeModal();
        }
    };

    const handlePut = async () => {
        const ok = await modificar(formState);

        if (ok) {
            onResetForm();
            closeModal();
        }
    };

    const handleModal = () => {
        closeModal();
        onResetForm();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 ">
            <div className="bg-white p-8 rounded shadow-lg min-w-[500px]">
                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
                    <X className='hover:scale-110 cursor-pointer hover:opacity-80' onClick={handleModal} />
                </div>
                {/* Aquí podés poner el formulario para agregar un producto */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-gray-700 text-sm font-medium mb-1">Nombre *</label>
                        <input
                            type="text"
                            value={nombre}
                            id="nombre"
                            name='nombre'
                            onChange={onInputChange}
                            className="w-full text-black placeholder:text-slate-400 px-4  py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Empanadas de carne"
                            autoComplete="nombre"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-gray-700 text-sm font-medium mb-1">Descripcion</label>
                        <input
                            type="text"
                            id="descripcion"
                            name='descripcion'
                            value={descripcion}
                            onChange={onInputChange}
                            className="w-full text-black placeholder:text-slate-400 px-4  py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Carne Picada, Cebolla, Morron, Aceitunas"
                            autoComplete="descripcion"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="precio" className="block text-gray-700 text-sm font-medium mb-1">Precio *</label>
                        <input
                            type="number"
                            id="precio"
                            name='precio'
                            value={precio}
                            onChange={onInputChange}
                            className="w-full text-black placeholder:text-slate-400 px-4  py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="0.00"
                            autoComplete="precio"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categoriaId" className="block text-gray-700 text-sm font-medium mb-1">Categoria *</label>
                        <select
                            id="categoriaId"
                            name='categoriaId'
                            value={categoriaId}
                            onChange={onInputChange}
                            className="w-full text-black placeholder:text-slate-400 px-4  py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required>
                            <option value="">---Seleccionar una opcion---</option>
                            {categrias?.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imagenFile" className="block text-gray-700 text-sm font-medium mb-1">Imagen </label>
                        <input
                            type="file"
                            name='imagenFile'
                            onChange={onInputChange}
                            id="imagenFile"
                            accept='image/'
                            className="w-full text-black placeholder:text-slate-400 px-4  py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    </div>
                    <div className='flex gap-5'>
                        <input
                            type="checkbox"
                            className='scale-150 accent-orange-600'
                            name="activo"
                            checked={activo}
                            onChange={onInputChange}
                            id="activo"
                        />
                        <label htmlFor="activo" className="ml-2">Producto Activo</label>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={handleModal}
                            className="px-4 cursor-pointer py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        {
                            !productoSeleccionada
                                ? (<button
                                    type="submit"
                                    disabled={isPending}
                                    className="px-4 py-2 cursor-pointer rounded bg-orange-600 text-white hover:bg-orange-700">
                                    {isPending ? 'Guardando...' : 'Guardar'}
                                </button>)
                                : (
                                    <button
                                        onClick={handlePut}
                                        type="button"
                                        disabled={isPendingModificar}
                                        className="px-4 py-2 cursor-pointer rounded bg-orange-600 text-white hover:bg-orange-700">
                                        {isPendingModificar ? 'Modificando...' : 'Modificar'}
                                    </button>
                                )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
