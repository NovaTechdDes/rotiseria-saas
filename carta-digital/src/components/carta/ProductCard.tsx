import { Producto } from '@/interface'
import React from 'react'
import { Button } from '../ui/Button'
import { Plus } from 'lucide-react'
import { useCategoriaStore } from '@/store/useCategoriaStore'
import { useCarritoStore } from '@/store/useCarritoStore'

interface Props {
    producto: Producto
}

const ProductCard = ({ producto }: Props) => {

    const { setProductos } = useCarritoStore();
    const { categoriaSeleccionada } = useCategoriaStore();

    if (categoriaSeleccionada !== 0 && categoriaSeleccionada !== producto.categoriaId) {
        return;
    };

    const agregarProductoCarrito = () => {
        setProductos({ producto, cantidad: 1 })
    };

    return (
        <div className="bg-white rounded-lg shadow-2xl p-4 flex w-xs flex-col items-center">
            <img
                src={producto.imagen || "/placeholder.png"}
                alt={producto.nombre}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-black font-bold mb-5 text-2xl text-center">{producto.nombre}</h2>
            <p className="text-gray-500 mb-5 text-sm text-center">{producto.descripcion}</p>
            <div className='flex justify-between w-full items-center mb-8'>
                <p className="text-md text-white bg-slate-500 font-bold rounded-lg px-2 py-1">{producto.Categoria?.nombre.toUpperCase()}</p>
                <p className="text-white bg-slate-500 font-bold text-md rounded-lg px-2 py-1 text-center mb-2">$ {producto.precio?.toFixed(2)}</p>
            </div>

            <div className='mt-auto' onClick={agregarProductoCarrito}>
                <Button texto='Agregar al Pedido' tipo='primary' icon={Plus} />
            </div>
        </div>
    )
}

export default ProductCard