import { startGetRotiseriaForDominio } from '@/actions';
import { useQuery } from '@tanstack/react-query';

export const useRotiseriaByDominio = (dominio: string) => {
  return useQuery({
    queryKey: ['rotiseria', dominio],
    queryFn: () => startGetRotiseriaForDominio(dominio),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
