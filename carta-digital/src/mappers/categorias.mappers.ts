// Mappers del backend hacia el frontend para Categorias

import { Categoria } from "@/interface";

// Tipos del backend (por ejemplo)
type CategoriaFromBackend = {
    id: number;
    created_at: Date;
    nombre: string;
    rotiseriaId: number;
};

// Mapper de una sola categoria
export function mapCategoriaFromBackend(data: CategoriaFromBackend): Categoria {
    return {
        id: data.id,
        nombre: data.nombre,
        created_at: data.created_at,
        rotiseriaId: data.rotiseriaId
    };
};

// Mapper de un array de categorias
export function mapCategoriasFromBackend(data: CategoriaFromBackend[]): Categoria[] {
    return data.map(mapCategoriaFromBackend);
};
