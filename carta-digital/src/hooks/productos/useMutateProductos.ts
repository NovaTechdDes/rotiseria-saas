import { productsActions } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateProductos = () => {
    const { startPostProducto, startUpdateProducto, startDeleteProducto } = productsActions();
    const queryClient = useQueryClient();

    const agregarProductoMutation = useMutation({
        mutationFn: startPostProducto,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productos'] });
        }
    });

    const modificarProductoMutation = useMutation({
        mutationFn: startUpdateProducto,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productos'] });
        }
    });

    const eliminarProductoMutation = useMutation({
        mutationFn: startDeleteProducto,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productos'] });
        }
    });

    return {
        agregarProducto: agregarProductoMutation,
        modificarProducto: modificarProductoMutation,
        eliminarProducto: eliminarProductoMutation
    };
};
