import { Producto } from '@/interface'
import React from 'react'
import { Button } from '../ui/Button'
import { Plus, SquarePen, Trash2 } from 'lucide-react'
import { useCategoriaStore } from '@/store/useCategoriaStore'
import { useCarritoStore } from '@/store/useCarritoStore'
import Swal from 'sweetalert2'
import { useMutateProductos } from '@/hooks'
import { useProductoStore } from '@/store'

interface Props {
    producto: Producto,
    carta?: boolean,
    buscador: string;
}

const ProductCard = ({ producto, carta = true, buscador = '' }: Props) => {

    const { setProductos } = useCarritoStore();
    const { categoriaSeleccionada } = useCategoriaStore();
    const { openModal, filtro } = useProductoStore();
    const { eliminarProducto } = useMutateProductos();

    const { mutateAsync: eliminar, isPending: isPendingEliminar } = eliminarProducto;

    if (categoriaSeleccionada !== 0 && categoriaSeleccionada !== producto.categoriaId && carta) {
        return;
    };

    if (!producto.nombre.toUpperCase().includes(buscador)) return;

    if (
        !producto.nombre.toUpperCase().includes(filtro.toUpperCase()) &&
        !producto.Categoria?.nombre.toUpperCase().includes(filtro.toUpperCase())
    ) {
        return;
    };

    const handleDelete = async () => {
        const { isConfirmed } = await Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            title: `Eliminar producto ${producto.nombre}?`
        });

        if (isConfirmed && producto.id) {
            eliminar(producto.id)
        };
    };

    const handlePut = async () => {
        openModal(producto)
    }

    const agregarProductoCarrito = () => {
        setProductos({ producto, cantidad: 1 })
    };

    return (
        <div className="bg-white rounded-lg shadow-2xl flex w-xs flex-col">
            <img
                src={producto.imagen || "/placeholder.png"}
                alt={producto.nombre}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-black font-bold mb-2 px-4 text-lg text-left">{producto.nombre}</h2>
            <p className="text-gray-500 mb-3 text-sm px-4 text-left">{producto.descripcion}</p>
            <div className='flex justify-between w-full items-center px-4 mb-8'>
                <p className="text-md text-orange-500 font-bold rounded-lg px-2 py-1">{producto.Categoria?.nombre.toUpperCase()}</p>
                <p className="text-orange-800 font-bold text-md rounded-lg px-2 py-1 text-center mb-2">$ {producto.precio?.toFixed(2)}</p>
            </div>

            {
                carta
                    ? (<div className='mt-auto mb-2 mx-5' onClick={agregarProductoCarrito}>
                        <Button texto='Agregar al Pedido' tipo='primary' icon={Plus} />
                    </div>)
                    : (
                        <div className='flex mt-auto mb-2 mx-5 gap-5'>
                            <div onClick={handlePut} className='flex-1'>
                                <Button texto='Editar' icon={SquarePen} />
                            </div>
                            <div onClick={handleDelete}>
                                <Button icon={Trash2} tipo='delete' texto={isPendingEliminar ? 'Eliminado' : ''} disabled={isPendingEliminar} />
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default ProductCard