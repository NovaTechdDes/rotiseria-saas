import { tipoEgresosActions } from '@/actions';
import { useQuery } from '@tanstack/react-query';

const { startGetTipoEgreso } = tipoEgresosActions();

export const useTipoEgresos = () => {
  return useQuery({
    queryKey: ['tipoEgresos'],
    queryFn: startGetTipoEgreso,
    staleTime: 1000 * 60 * 60,
  });
};
