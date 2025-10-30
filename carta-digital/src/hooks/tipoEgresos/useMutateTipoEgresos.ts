
import { tipoEgresosActions } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateTipoEgresos = () => {
    const { startPostTipoEgreso, startUpdateTipoEgreso, startDeleteTipoEgreso } = tipoEgresosActions();
    const queryClient = useQueryClient();

    const agregarTipoEgresoMutation = useMutation({
        mutationFn: startPostTipoEgreso,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tipoEgresos'] });
        }
    });

    const modificarTipoEgresoMutation = useMutation({
        mutationFn: startUpdateTipoEgreso,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tipoEgresos'] });
        }
    });

    const eliminarTipoEgresoMutation = useMutation({
        mutationFn: startDeleteTipoEgreso,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tipoEgresos'] });
        }
    });

    return {
        agregarTipoEgreso: agregarTipoEgresoMutation,
        modificarTipoEgreso: modificarTipoEgresoMutation,
        eliminarTipoEgreso: eliminarTipoEgresoMutation
    };
};
