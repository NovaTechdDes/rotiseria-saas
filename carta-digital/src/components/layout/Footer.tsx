import { Dot } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-black">
      <p className="text-gray-600">La plataforma completa para administrar tu rotiseria de forma profesional</p>

      <nav className="flex gap-5 justify-center mt-2">
        <Link href="#demo" className="text-slate-800 hover:text-orange-500">
          Demo
        </Link>
        <Dot className="text-slate-800" />
        <Link className="text-slate-800 hover:text-orange-500" href="#caracteristicas">
          Caracteristicas
        </Link>
        <Dot className="text-slate-800" />
        <Link className="text-slate-800 hover:text-orange-500" href="#precios">
          Precios
        </Link>
      </nav>
      <div className="flex gap-2 items-center justify-center mt-2">
        <p className=" text-gray-600">© 2025 Rotiseria SaaS. Todos los derechos reservados.</p>
        <p className="text-orange-500">Desarrollado por Novatech</p>
      </div>
    </footer>
  );
};

export default Footer;
