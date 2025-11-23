import React from 'react';
import { Producto } from '@/interface';
import { ProductItem } from './ProductItem';

interface Props {
  products: Producto[];
  onEdit: (product: Producto) => void;
}

export const ProductList = ({ products, onEdit }: Props) => {
  if (!products || products.length === 0) {
    return <div className="text-center p-10 text-gray-500">No se encontraron productos.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((producto) => (
        <ProductItem key={producto.id} producto={producto} onEdit={onEdit} />
      ))}
    </div>
  );
};
