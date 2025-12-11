import { startDeleteCategoria, startPostCategoria, startUpdateCategoria } from '@/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateCategorias = () => {
  const queryClient = useQueryClient();

  const agregarCategoriaMutation = useMutation({
    mutationFn: startPostCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });

  const modificarCategoriaMutation = useMutation({
    mutationFn: startUpdateCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });

  const eliminarCategoriaMutation = useMutation({
    mutationFn: startDeleteCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });

  return {
    agregarCategoria: agregarCategoriaMutation,
    modificarCategoria: modificarCategoriaMutation,
    eliminarCategoria: eliminarCategoriaMutation,
  };
};
