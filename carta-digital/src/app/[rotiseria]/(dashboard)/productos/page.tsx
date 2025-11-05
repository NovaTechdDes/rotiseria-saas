'use client'
import ProductCard from '@/components/carta/ProductCard';
import { ModalProducto } from '@/components/dashboard/producto/ModalProducto';
import { HeaderDashboard } from '@/components/dashboard/ui/HeaderDashboard'
import { useProductos } from '@/hooks';
import { useProductoStore } from '@/store';
import { useRotiseriaStore } from '@/store/useRotiseriaStore'
import { Search } from 'lucide-react';
import React from 'react'

//TODO ELiminar imagen al eliminar producto

const Producto = () => {
    const { rotiseriaActive } = useRotiseriaStore();

    const { data: productos, isLoading } = useProductos(rotiseriaActive ? rotiseriaActive.id : 0);
    const { modalAbierto, openModal, setFiltro } = useProductoStore();

    const handleAdd = () => {
        openModal()
    }

    return (
        <div className='text-black'>
            <HeaderDashboard lista={productos} seccion='productos' handleAdd={handleAdd} titulo='Productos' textoBoton='Agregar Producto' />
            <div>
                <div className="relative flex items-center w-full mx-auto mt-6">
                    <input
                        type="text"
                        onChange={(e) => setFiltro(e.target.value)}
                        placeholder="Buscar producto por nombre o categoria..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <span className="absolute left-3 text-gray-400">
                        <Search size={15} />
                    </span>
                </div>
            </div>
            <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 gap-5'>
                {productos?.map(producto => (
                    <ProductCard key={producto.id} producto={producto} carta={false} />
                ))}
            </main>
            {modalAbierto && <ModalProducto />}
        </div>
    )
}

export default Producto