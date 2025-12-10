import { TipoEgreso } from './TipoEgreso';

export interface Egreso {
  id?: number;
  created_at?: Date | string;
  importe: number;
  descripcion: string;
  tipoEgresoId?: number;
  usuarioId?: number;
  rotiseriaId?: number;
  TipoEgreso?: TipoEgreso;
  mostrar: boolean;
}
