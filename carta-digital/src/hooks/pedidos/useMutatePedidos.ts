
import { pedidosActions } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutatePedidos = () => {

    const { startUpdatePedido, startPostPedido, startDeletePedido } = pedidosActions();
    const queryClient = useQueryClient();

    const agregarPedidoMutation = useMutation({
        mutationFn: startPostPedido,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pedidos'] });
        }
    });

    const modificarPedidoMutation = useMutation({
        mutationFn: startUpdatePedido,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pedidos'] });
        }
    });

    const eliminarPedidoMutation = useMutation({
        mutationFn: startDeletePedido,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pedidos'] });
        }
    });

    return {
        agregarPedido: agregarPedidoMutation,
        modificarPedido: modificarPedidoMutation,
        eliminarPedido: eliminarPedidoMutation
    };

};
