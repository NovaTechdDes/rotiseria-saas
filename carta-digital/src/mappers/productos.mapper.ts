import { Producto } from '@/interface';

type ProductoFromBackend = {
  id: number;
  created_at: Date;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  activo: boolean;
  categoriaId: number;
  rotiseriaId: number;
};

export function mapProductoFromBackend(data: ProductoFromBackend): Producto {
  return {
    id: data.id,
    created_at: data.created_at,
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    imagen: data.imagen,
    activo: data.activo,
    categoriaId: data.categoriaId,
    rotiseriaId: data.rotiseriaId,
  };
}

// Mappear un arreglo de productos
export function mapProductosFromBackend(
  data: ProductoFromBackend[]
): Producto[] {
  return data.map(mapProductoFromBackend);
}
