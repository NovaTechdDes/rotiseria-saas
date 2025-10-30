import { productsActions } from "@/actions";
import { useQuery } from "@tanstack/react-query";

const { startGetProductos } = productsActions();

export const useProductos = () => {
    return useQuery({
        queryKey: ['productos'],
        queryFn: startGetProductos,
        staleTime: 1000 * 60 * 60,
    });
};
