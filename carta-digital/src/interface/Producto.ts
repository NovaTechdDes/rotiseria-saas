export interface Producto {
    id?: number;
    created_at: Date;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    activo: boolean;
    categoriaId: number;
    rotiseriaId: number;
};