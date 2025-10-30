import { egresoActions } from "@/actions";
import { useQuery } from "@tanstack/react-query";

const { startGetEgresos } = egresoActions();

export const useEgresos = () => {
    return useQuery({
        queryKey: ['egresos'],
        queryFn: startGetEgresos,
        staleTime: 1000 * 60 * 60
    });
};
