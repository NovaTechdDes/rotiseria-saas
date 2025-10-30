import { pedidosActions } from "@/actions";
import { useQuery } from "@tanstack/react-query";

const { startGetPedidos } = pedidosActions();

export const usePedidos = () => {
    return useQuery({
        queryKey: ['pedidos'],
        queryFn: startGetPedidos,
        staleTime: 1000 * 60 * 60,
    });
};
