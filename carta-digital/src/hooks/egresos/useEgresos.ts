import { egresoActions } from "@/actions";
import { useQuery } from "@tanstack/react-query";

const { startGetEgresos } = egresoActions();

export const useEgresos = (desde: string, hasta: string) => {
    return useQuery({
        queryKey: ['egresos', desde, hasta],
        queryFn: () => startGetEgresos(desde, hasta),
        staleTime: 1000 * 60 * 60
    });
};
