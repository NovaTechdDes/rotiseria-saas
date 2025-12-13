import { Button } from '@/components/ui/Button';
import '../styles/global.css';
import Caracteristicas from '@/components/layout/Caracteristicas';
import { ArrowRightIcon } from 'lucide-react';
import { Precio } from '@/components/layout/Precio';
import Footer from '@/components/layout/Footer';
import { Info } from '@/components/layout/Info';
import Link from 'next/link';

const Home = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-full rounded-xl bg-gray-200 shadow-2xl p-8 md:p-12 space-y-10 text-center transform transition-all duration-500 hover:scale-[1.01]">
        <div id="demo" className="text-black">
          <h1 className="text-6xl font-bold">
            Gestiona tu rotiseria de forma <span className="text-orange-500">profesional</span>
          </h1>
          <p className="text-slate-500 text-lg mt-2">
            La plataforma todo en uno para administrar productos, pedidos, egresos y reportes de tu rotisería. Simple, potente y diseñada específicamente para tu negocio.
          </p>

          <div className="flex mt-5 justify-center w-full">
            <Button type="button">
              <Link href={`https://buenacomida.rotiseriasaas.com.ar/`} target="_blank" className="flex items-center">
                Ver Demo en vivo
                <ArrowRightIcon className="w-6 h-6 ml-2" />
              </Link>
            </Button>
          </div>
          <p className="text-sm  mt-2 text-slate-400">Sin Tarjeta de credito . Configuracion en minutos</p>
        </div>

        <Caracteristicas />

        <Info />

        <Precio />

        <Footer />
      </div>
    </div>
  );
};

export default Home;
