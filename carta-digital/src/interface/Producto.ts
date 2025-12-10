import { Categoria } from './Categoria';

export interface Producto {
  id?: number;
  created_at?: Date;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  imagenFile?: File | null;
  stock: boolean;

  mostrar: boolean;
  categoriaId: number;
  rotiseriaId: number;
  Categoria?: Categoria;
}
