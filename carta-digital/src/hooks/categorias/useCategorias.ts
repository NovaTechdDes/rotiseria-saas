import { categoriasActions } from "@/actions";
import { useQuery } from "@tanstack/react-query"

const { startGetCategoriasByRotiseriaId } = categoriasActions();

export const useCategorias = (id: number) => {
    return useQuery({
        queryKey: ['categorias', id],
        queryFn: () => startGetCategoriasByRotiseriaId(id),
        staleTime: 1000 * 60 * 60
    });
};