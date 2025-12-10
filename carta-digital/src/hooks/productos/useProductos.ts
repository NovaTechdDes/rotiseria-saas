import { startGetProductosByRotiseriaId } from '@/actions';
import { useQuery } from '@tanstack/react-query';

export const useProductos = (id: number) => {
  return useQuery({
    queryKey: ['productos', id],
    queryFn: () => startGetProductosByRotiseriaId(id),
    staleTime: 1000 * 60 * 60,
  });
};
