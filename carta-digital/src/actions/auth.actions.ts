import { Usuario } from '@/interface';
import { supabase } from '@/lib/supabase';
import Swal from 'sweetalert2';

export const loginSupabase = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      await Swal.fire('Error al loguearse', error.message, 'error');
      return false;
    }
    return data.session;
  } catch (error: any) {
    console.log(error);
    await Swal.fire('Error inseperado al loguearse', error.message, 'error');
    return false;
  }
};

export const userAuthenticated = async () => {
  try {
    const { data } = await supabase.auth.getUser();

    const { data: user } = await supabase.from('usuario').select().single();
    return user;
  } catch (error: any) {
    console.log(error);
    await Swal.fire(
      'Error inesperado al obtener el usuario',
      error.message,
      'error'
    );
  }
};

export const getUsuarios = async (rotiseriaId: number) => {
  try {
    const { data, error } = await supabase.from('Usuario').select();
    if (error) {
      await Swal.fire('Error al obtener los usuarios', error.message, 'error');
      return [];
    }
    return data;
  } catch (error: any) {
    console.log(error);
    await Swal.fire(
      'Error inesperado al obtener los usuarios',
      error.message,
      'error'
    );
    return [];
  }
};

export const startPostUsuario = async (usuario: Usuario): Promise<boolean> => {
  try {
    const { error } = await supabase.from('Usuario').insert(usuario);
    if (error) {
      await Swal.fire('Error al cargar usuario', error.message, 'error');
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
