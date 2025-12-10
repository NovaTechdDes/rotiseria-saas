'use server';
import { loginAction } from '@/actions';
import { SumbitButton } from '@/components/ui/SumbitButton';
import { VolverCarta } from '@/components/ui/VolverCarta';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <VolverCarta />
        <h2 className="text-3xl font-bold text-center text-gray-800">Panel Administrativo</h2>
        <p className="mb-6 text-slate-500 text-center">Ingrese a tu Dashboard</p>
        <form className="space-y-5" action={loginAction}>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
              name="password"
              className="w-full text-black placeholder:text-slate-400 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="********"
              autoComplete="current-password"
              required
            />
          </div>
          <SumbitButton />
        </form>
      </div>
    </div>
  );
};

export default Login;
