export interface Egreso {
    id?: number;
    created_at: Date;
    importe: number;
    descripcion: string;
    tipoEgresoId: number;
    usuarioId: number;
    rotiseriaId: number;
}