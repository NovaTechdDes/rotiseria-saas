import { Button } from '@/components/ui/Button';
import '../styles/global.css';
import { headers } from 'next/headers';

const Home = async () => {
  const host = (await headers()).get('host') || '';
  const subdomain = host.split('.')[0].split(':')[0];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Software de Gestión para Rotiserías</h1>
          <p className="mt-2 text-sm text-gray-600">Optimiza tu negocio de rotisería con nuestra solución integral.</p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-gray-700">
            Desde el control de pedidos hasta la gestión de inventario y clientes, nuestro SaaS está diseñado para simplificar tus operaciones y aumentar tu rentabilidad.
          </p>
          <ul className="list-disc list-inside text-left text-gray-700 mx-auto max-w-xs">
            <li>Gestión de pedidos eficiente</li>
            <li>Control de stock en tiempo real</li>
            <li>Fidelización de clientes</li>
            <li>Reportes y análisis avanzados</li>
          </ul>
        </div>
        <div>
          <Button
            type="button"
            className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Saber Más
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
