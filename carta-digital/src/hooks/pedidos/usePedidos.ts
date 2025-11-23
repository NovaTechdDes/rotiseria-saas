import { pedidosActions } from '@/actions';
import { useQuery } from '@tanstack/react-query';

const { startGetPedidos } = pedidosActions();

export const usePedidos = (id: number) => {
  return useQuery({
    queryKey: ['pedidos', id],
    queryFn: () => startGetPedidos(id),
    staleTime: 1000 * 60 * 60,
  });
};
