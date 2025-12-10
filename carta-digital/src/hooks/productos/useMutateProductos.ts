import { startDeleteProducto, startPostProducto, startUpdateProducto } from '@/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateProductos = () => {
  const queryClient = useQueryClient();

  const agregarProductoMutation = useMutation({
    mutationFn: startPostProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });

  const modificarProductoMutation = useMutation({
    mutationFn: startUpdateProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });

  const eliminarProductoMutation = useMutation({
    mutationFn: startDeleteProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });

  return {
    agregarProducto: agregarProductoMutation,
    modificarProducto: modificarProductoMutation,
    eliminarProducto: eliminarProductoMutation,
  };
};
