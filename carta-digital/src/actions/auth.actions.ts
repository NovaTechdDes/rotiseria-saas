'use server';

import { Usuario } from '@/interface';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Swal from 'sweetalert2';

const SESSION_COOKIE_TOKEN = 'auth_session_token';

export const loginAction = async (formData: FormData) => {
  const MAX_AGE_ONE_DAY = 60 * 60 * 24;
  const cookieStore = await cookies();
  let redirectUrl = '/admin/pedidos';

  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    const sessionToken = data.session?.access_token;

    cookieStore.set(SESSION_COOKIE_TOKEN, sessionToken, {
      httpOnly: true,
      maxAge: MAX_AGE_ONE_DAY,
      sameSite: 'lat',
      path: '/',
    });
  } catch (error: any) {
    redirectUrl = '/login';
    console.log(error);
    return error.message;
  } finally {
    redirect(redirectUrl);
  }
};

export const logOutAction = async () => {
  await supabase.auth.signOut();

  const cookiesStore = await cookies();
  cookiesStore.delete(SESSION_COOKIE_TOKEN);
};

export const userAuthenticated = async () => {
  try {
    const { data } = await supabase.auth.getUser();

    console.log(data);

    const { data: user } = await supabase.from('usuario').select().single();
    return user;
  } catch (error: any) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return false;
  }
};
