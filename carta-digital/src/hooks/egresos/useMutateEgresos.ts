import { startDeleteEgreso, startPostEgreso, startUpdateEgreso } from '@/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/*
    Use Mutate Egresos es una funcion que engloba las 3 funciones principales para modificar datos en la base de datos

    agregarEgresoMutation lo que hace es usar UseMutation, una funcion de tanstaquery 
    Pasandole como funcion el startPostEgreso de egresoActions y una vez completado eso osea onSucces lo que hacemos, 
    es invalidar la query egresos para que vuelva a ejecutar useEgresos (el otro archivo) para hacer una peticion http a los nuevos datos

    modficarEgresoMutation y eliminarEgresoMutation hacen lo mismo solo que llaman a otras funciones
*/

export const useMutateEgresos = () => {
  //Necesitamos traer el useQueryClient que engloba a toda la aplicacion
  const queryClient = useQueryClient();

  const agregarEgresoMutation = useMutation({
    mutationFn: startPostEgreso,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['egresos'] });
    },
  });

  const modificarEgresoMutation = useMutation({
    mutationFn: startUpdateEgreso,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['egresos'] });
    },
  });

  const eliminarEgresoMutation = useMutation({
    mutationFn: startDeleteEgreso,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['egresos'] });
    },
  });

  return {
    agregarEgreso: agregarEgresoMutation,
    modificarEgreso: modificarEgresoMutation,
    eliminarEgreso: eliminarEgresoMutation,
  };
};
