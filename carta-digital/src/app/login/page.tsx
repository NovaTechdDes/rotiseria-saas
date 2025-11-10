'use client'
import React, { useEffect, useEffectEvent, useState } from 'react'
import { ArrowLeft, ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { supabase } from '@/lib/supabase';

const Login = () => {
    const router = useRouter();
    const { login, user, verificarAutenticacion } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        verificarAutenticacion()
        if (user) {
            router.push('/pedidos')
        }
    }, [user, router])


    const handleBack = () => {
        router.back();
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        login(email, password)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className='hover:cursor-pointer mb-2 text-orange-500 hover:underline flex gap-2' onClick={handleBack}>
                    <ArrowLeft />
                    <p className='text-lg'>Volver</p>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800">Panel Administrativo</h2>
                <p className='mb-6 text-slate-500 text-center'>Ingrese a tu Dashboard</p>
                <form className="space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-black placeholder:text-slate-400 px-4  py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="tucorreo@ejemplo.com"
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-black placeholder:text-slate-400 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="********"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors"
                    >
                        Ingresar
                    </button>
                </form>
                <div className="mt-4 flex justify-between text-sm">
                    <a href="#" className="text-orange-500 hover:underline">¿Olvidaste tu contraseña?</a>
                    <a href="#" className="text-orange-500 hover:underline">Registrarse</a>
                </div>
            </div>
        </div>
    )
}

export default Login