import { reporteActions } from "@/actions"
import { useQuery } from "@tanstack/react-query"

const { startGetTipoPagoPedido } = reporteActions();


export const useReportesTipoPagosPedido = (desde: string, hasta: string, rotiseriaId: number) => {
    return useQuery({
        queryKey: ['reporteTipoPagos', desde, hasta, rotiseriaId],
        queryFn: () => startGetTipoPagoPedido(desde, hasta, rotiseriaId),
        staleTime: 1000 * 60 * 60
    });
};