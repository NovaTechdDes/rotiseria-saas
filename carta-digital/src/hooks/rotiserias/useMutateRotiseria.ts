import { rotiseriasActions } from '@/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateRotiseria = () => {
  const { startUpdateRotiseria } = rotiseriasActions();
  const queryClient = useQueryClient();

  const modificarRotiseriaMutation = useMutation({
    mutationFn: startUpdateRotiseria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rotiseria'] });
    },
  });

  return {
    modificarRotiseriaMutation,
  };
};
