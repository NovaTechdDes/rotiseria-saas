'use server';
import { startGetProductosByRotiseriaId } from '@/actions';
import { ProductCardClient } from '../products/ProductCardClient';

interface Props {
  rotiseriaId: number;
}

export const GridProductos = async ({ rotiseriaId }: Props) => {
  const productos = await startGetProductosByRotiseriaId(rotiseriaId);
  return (
    <>
      {productos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {productos.map((producto) => (
            <ProductCardClient
              key={producto.id}
              id={producto.id || 0}
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              imagen={producto.imagen || '/placeholder-comida.jpg'}
              rotiseriaId={producto.rotiseriaId || 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-lg">No encontramos productos en esta categoría</p>
        </div>
      )}
    </>
  );
};
