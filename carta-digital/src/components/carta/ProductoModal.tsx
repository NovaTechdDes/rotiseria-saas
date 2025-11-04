import React from 'react'
import { Button } from '../ui/Button'
import { Producto } from '@/interface'
import { Minus, Plus } from 'lucide-react'
import { useCarritoStore } from '@/store/useCarritoStore'
interface Props {
    producto: Producto,
    cantidad: number
}

export const ProductoModal = ({ producto, cantidad }: Props) => {

    const { addItem, subsItem } = useCarritoStore();

    const sumarItem = () => {
        producto.id && addItem(producto.id);
    };

    const restarItem = () => {
        producto.id && subsItem(producto.id);
    }

    return (
        <div className='mt-5 flex gap-5 items-center'>
            <div>
                <img
                    src={producto.imagen || "/placeholder.png"}
                    alt={producto.nombre}
                    className="w-20 h-20 object-cover rounded-lg mb-4"
                />
            </div>

            <div className='flex flex-col'>
                <h3 className='text-xl font-semibold'>{producto.nombre}</h3>
                <p className='text-orange-500'>$ {producto.precio.toFixed(2)}</p>
            </div>

            <div className='flex gap-2 items-center ml-auto'>
                <div onClick={restarItem}>
                    <Button icon={Minus} />
                </div>
                <p>{cantidad.toFixed(2)}</p>
                <div onClick={sumarItem}>
                    <Button icon={Plus} />
                </div>
            </div>
        </div>
    )
}
