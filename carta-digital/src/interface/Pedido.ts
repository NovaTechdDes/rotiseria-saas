export interface Pedido {
    id?: number;
    created_at: Date;
    cliente: string;
    telefono: string;
    direccion: string;
    envio: boolean;
    vuelto: number
    total: number;
    estado: string;
    usuarioId: number;
    rotiseriaId: number;

}