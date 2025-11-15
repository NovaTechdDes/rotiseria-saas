export const verificarError = (codigo: string) => {

    if (codigo === "23503") {
        return 'No se puede eliminar el tipo de egreso porque existen egresos que incluyen este tipo'
    };
};