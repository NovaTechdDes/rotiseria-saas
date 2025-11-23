import { reporteActions } from '@/actions';
import { useQuery } from '@tanstack/react-query';

const { startGetReportesForDate } = reporteActions();

export const useReportesForDate = (
  desde: string,
  hasta: string,
  rotiseriaId: number
) => {
  return useQuery({
    queryKey: ['reportes', desde, hasta, rotiseriaId],
    queryFn: () => startGetReportesForDate(desde, hasta, rotiseriaId),
    staleTime: 1000 * 60 * 60,
  });
};
