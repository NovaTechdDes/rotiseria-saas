'use server';

import { Usuario } from '@/interface';
import { supabase } from '@/lib/supabase';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Swal from 'sweetalert2';

export const loginAction = async (formData: FormData) => {
  const supabase = await createClient();
  let redirectUrl = '/admin/pedidos';

  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  } catch (error: any) {
    redirectUrl = '/login';
    console.error(error);

    return error.message;
  } finally {
    redirect(redirectUrl);
  }
};

export const logOutAction = async () => {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect('/login');
};

export const userAuthenticated = async () => {
  try {
    const { data } = await supabase.auth.getUser();

    console.log(data);

    const { data: user } = await supabase.from('usuario').select().single();
    return user;
  } catch (error: any) {
    console.error(error);
    await Swal.fire('Error inesperado al obtener el usuario', error.message, 'error');
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
    console.error(error);
    await Swal.fire('Error inesperado al obtener los usuarios', error.message, 'error');
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
    console.error(error);
    return false;
  }
};
