'use client';
import { logOutAction, userAuthenticated } from '@/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const verificarAutenticacion = async () => {
    const res = await userAuthenticated();
    setUser(res);
  };

  const logOut = async () => {
    logOutAction();
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return {
    verificarAutenticacion,
    logOut,
    user,
    loading,
  };
};
