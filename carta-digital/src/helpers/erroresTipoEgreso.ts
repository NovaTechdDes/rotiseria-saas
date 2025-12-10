/*
    Tratar de obtneer el error en un modificanoon de la base de datos de supabase y devolverlas del tipo string para mostrarlas al usuario
*/

export const verificarError = (codigo: string) => {
  if (codigo === '23503') {
    return 'No se puede eliminar el tipo de egreso porque existen egresos que incluyen este tipo';
  }
};
