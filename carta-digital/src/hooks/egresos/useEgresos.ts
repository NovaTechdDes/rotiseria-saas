/*
    Explicando el codigo primero importamos de actions el egresoActions que trae algunas funiones como startGetEgresos
    dentro de la funcion useEgresos pasamos por parametros el desde y el hasta para filtrar por fecha.
    Retornamos un useQuery de tanstackquery que definimos.

    queryKey: las claves, esto siginifica que cuando las claves cambien volver q ejecutrar queryFn que llama a la funcion startGetEgresos
    las fechas desde y hasta las podemos modificar desde los componenete donde se renderizan 
    y al cambiar se va a ejecutar devuelta esta funcion.
    
    En caso de que las claves no se modifiquen durante una hora pero se vuelva a pedir el useEgresos entonces
    devuelve lo que tiene en cache.
*/

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
