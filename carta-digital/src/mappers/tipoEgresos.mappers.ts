import { TipoEgreso } from "@/interface";

type TipoEgresosFromBackend = {
    id: number;
    created_at: Date;
    nombre: string;
    rotiseriaId: number;
};

//Mappear un solo tipo de egreso
export function mapTipoEgresoFromBackend(data: TipoEgresosFromBackend): TipoEgreso {
    return {
        id: data.id,
        nombre: data.nombre,
        created_at: data.created_at,
        rotiseriaId: data.rotiseriaId
    };
};


//Mappear de un arregle de tipos de egresos
export function mapTipoEgresosFromBackend(data: TipoEgresosFromBackend[]): TipoEgreso[] {
    return data.map(mapTipoEgresoFromBackend);
}
