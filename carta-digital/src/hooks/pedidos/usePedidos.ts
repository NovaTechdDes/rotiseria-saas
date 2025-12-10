import { startGetPedidos } from '@/actions';
import { useQuery } from '@tanstack/react-query';

export const usePedidos = (id: number, desde: string, hasta: string) => {
  return useQuery({
    queryKey: ['pedidos', id],
    queryFn: () => startGetPedidos(id, desde, hasta),
    staleTime: 1000 * 60 * 60,
  });
};
