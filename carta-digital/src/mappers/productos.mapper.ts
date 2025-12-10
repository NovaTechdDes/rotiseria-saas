import { Producto } from '@/interface';

type ProductoFromBackend = {
  id: number;
  created_at: Date;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: boolean;
  categoriaId: number;
  rotiseriaId: number;
  mostrar: boolean;
};

export function mapProductoFromBackend(data: ProductoFromBackend): Producto {
  return {
    id: data.id,
    created_at: data.created_at,
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    imagen: data.imagen,
    stock: data.stock,
    mostrar: data.mostrar,
    categoriaId: data.categoriaId,
    rotiseriaId: data.rotiseriaId,
  };
}

// Mappear un arreglo de productos
export function mapProductosFromBackend(data: ProductoFromBackend[]): Producto[] {
  return data.map(mapProductoFromBackend);
}
