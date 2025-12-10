import { reporteActions } from '@/actions';
import { useQuery } from '@tanstack/react-query';

const { startGetMostPopularProducto } = reporteActions();

export const useReportesMostPopularProducto = (
  desde: string,
  hasta: string,
  rotiseriaId: number
) => {
  return useQuery({
    queryKey: ['reporteProductosMasPopulares', desde, hasta, rotiseriaId],
    queryFn: () => startGetMostPopularProducto(desde, hasta, rotiseriaId),
    staleTime: 1000 * 60 * 60,
  });
};
