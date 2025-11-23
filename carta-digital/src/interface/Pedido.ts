import { ListaProductos } from '@/store';
import { MovProducto } from './MovProducto';

export interface Pedido {
  id?: number;
  created_at?: Date;
  cliente: string;
  telefono: string;
  direccion: string;
  envio: string;
  vuelto: number;
  total?: number;
  estado: string;
  observaciones: string;
  tipoPago: string;
  rotiseriaId: number;
  productos?: ListaProductos[];
  movProductos?: MovProducto[];
  mostrar: boolean;
}
