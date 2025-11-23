'use client';
import { loginSupabase, userAuthenticated } from '@/actions';
import { supabase } from '@/lib/supabase';
import { Session } from 'inspector/promises';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const verificarAutenticacion = async () => {
    const res = await userAuthenticated();
    setUser(res);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const session = await loginSupabase(email, password);
      setUser(session);
    } catch (error) {
      await Swal.fire('Error al loguearse', '', 'error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    verificarAutenticacion,
    login,
    logOut,
    user,
    loading,
  };
};
