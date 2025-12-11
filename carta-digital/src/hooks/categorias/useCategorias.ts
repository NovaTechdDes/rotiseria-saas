import { startGetCategoriasByRotiseriaId } from '@/actions';
import { useQuery } from '@tanstack/react-query';

export const useCategorias = (id: number) => {
  return useQuery({
    queryKey: ['categorias', id],
    queryFn: () => startGetCategoriasByRotiseriaId(id),
    staleTime: 1000 * 60 * 60,
  });
};
