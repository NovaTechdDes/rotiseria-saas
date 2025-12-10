import { getUsuarios } from '@/actions';
import { useQuery } from '@tanstack/react-query';

export const useUsuarios = (rotiseriaId: number) => {
  return useQuery({
    queryKey: ['usuarios', rotiseriaId],
    queryFn: () => getUsuarios(rotiseriaId),
    staleTime: 1000 * 60 * 60,
  });
};
