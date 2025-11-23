import { startPostUsuario } from '@/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateUsuarios = () => {
  const queryClient = useQueryClient();

  const agregarUsuarioMutation = useMutation({
    mutationFn: startPostUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });

  return {
    agregarUsuarioMutation,
  };
};
