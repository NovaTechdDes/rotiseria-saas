import { egresoActions } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateEgresos = () => {
    const { startPostEgreso, startUpdateEgreso, startDeleteEgreso } = egresoActions();
    const queryClient = useQueryClient();

    const agregarEgresoMutation = useMutation({
        mutationFn: startPostEgreso,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['egresos'] });
        }
    });

    const modificarEgresoMutation = useMutation({
        mutationFn: startUpdateEgreso,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['egresos'] });
        }
    });

    const eliminarEgresoMutation = useMutation({
        mutationFn: startDeleteEgreso,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['egresos'] });
        }
    });

    return {
        agregarEgreso: agregarEgresoMutation,
        modificarEgreso: modificarEgresoMutation,
        eliminarEgreso: eliminarEgresoMutation
    };
};
