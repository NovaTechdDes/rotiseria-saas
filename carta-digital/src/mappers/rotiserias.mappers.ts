import { Rotiseria } from '@/interface/Rotiseria';

type RotiseriasFromBackend = {
  id: number;
  created_at: Date;
  nombre: string;
  dominio: string;
  slug: string;
  horario: string;
  logo: string;
  telefono: string;
  direccion: string;
};

//Mappear una sola rotiseria
export function mapRotiseriaFromBackend(
  data: RotiseriasFromBackend
): Rotiseria {
  return {
    id: data.id,
    created_at: data.created_at,
    nombre: data.nombre,
    dominio: data.dominio,
    slug: data.slug,
    horario: data.slug,
    logo: data.logo,
    telefono: data.telefono,
    direccion: data.direccion,
  };
}
