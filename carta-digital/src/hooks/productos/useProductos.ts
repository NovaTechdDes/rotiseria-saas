import { productsActions } from '@/actions';
import { useQuery } from '@tanstack/react-query';

const { startGetProductosByRotiseriaId } = productsActions();

export const useProductos = (id: number) => {
  return useQuery({
    queryKey: ['productos', id],
    queryFn: () => startGetProductosByRotiseriaId(id),
    staleTime: 1000 * 60 * 60,
  });
};
