import { categoriasActions } from "@/actions";
import { useQuery } from "@tanstack/react-query"

const { startGetCategorias } = categoriasActions();

export const useCategorias = () => {
    return useQuery({
        queryKey: ['categorias'],
        queryFn: startGetCategorias,
        staleTime: 1000 * 60 * 60
    });
};