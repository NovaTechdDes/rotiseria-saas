import { ListaProductos } from "@/store";
import { Producto } from "./Producto";

export interface Pedido {
    id?: number;
    created_at?: Date;
    cliente: string;
    telefono: string;
    direccion: string;
    envio: string;
    vuelto: number
    total?: number;
    estado: string;
    observaciones: string;
    tipoPago: string;
    usuarioId: number;
    rotiseriaId: number;
    productos?: ListaProductos[];

}