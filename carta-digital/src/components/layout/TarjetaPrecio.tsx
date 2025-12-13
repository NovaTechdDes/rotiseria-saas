import { Check } from 'lucide-react';
import React from 'react';

interface Props {
  title: string;
  precio: number;
  subtitulo: string;
  lista: string[];
  aumento: boolean;
}

export const TarjetaPrecio = ({ title, precio, subtitulo, lista, aumento }: Props) => {
  return (
    <div className="border border-gray-300 rounded-lg bg-white p-5 h-full flex flex-col justify-between w-[350px]">
      <h3 className="text-xl font-bold mt-2">{title}</h3>
      <p className="text-2xl font-bold">
        {new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 2,
        }).format(precio)}
        /mes
      </p>
      <p className="text-slate-500">{subtitulo}</p>

      <div className="mt-5 flex flex-col ">
        {lista.map((element) => (
          <div key={element} className="flex items-center gap-2 text-left">
            <Check className="text-orange-500" />
            <p>{element}</p>
          </div>
        ))}
      </div>

      {aumento && <p className="text-orange-500 mt-10">Precio adicional al plan basico</p>}
    </div>
  );
};
