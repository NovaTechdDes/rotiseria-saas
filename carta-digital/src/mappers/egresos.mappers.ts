import { Egreso } from '@/interface';

type EgresoFromBackend = {
  id: number;
  created_at: Date;
  importe: number;
  descripcion: string;
  tipoEgresoId: number;
  usuarioId: number;
  rotiseriaId: number;
  mostrar: boolean;
};

// Mapper de un solo egreso
export function mapEgresoFromBackend(data: EgresoFromBackend): Egreso {
  return {
    id: data.id,
    created_at: data.created_at,
    descripcion: data.descripcion,
    importe: data.importe,
    tipoEgresoId: data.tipoEgresoId,
    usuarioId: data.usuarioId,
    mostrar: data.mostrar,
    rotiseriaId: data.rotiseriaId,
  };
}

// Mapper de un arreglo de egresos
export function mapEgresosFromBackend(data: EgresoFromBackend[]): Egreso[] {
  return data.map(mapEgresoFromBackend);
}
