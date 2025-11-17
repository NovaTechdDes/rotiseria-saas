export interface Usuario {
    nombre: string;
    email: string;
    estado: 'Pendiente' | 'Activo' | 'Inactivo';
    rol: 'admin' | 'empleado';
    rotiseriaId?: number;
}