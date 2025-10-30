export interface MovProducto {
    id?: number;
    created_at: Date;
    cantidad: number;
    precioUnitario: number;
    productoId: number;
    pedidoId: number
    rotiseriaId: number;
};