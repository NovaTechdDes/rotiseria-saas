import React from 'react';
import { Egreso } from '@/interface';
import { EgresoCard } from './EgresoCard';

interface Props {
  egresos: Egreso[];
}

export const EgresoList = ({ egresos }: Props) => {
  if (!egresos || egresos.length === 0) {
    return <div className="text-center p-10 text-gray-500">No se encontraron egresos.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {egresos.map((egreso) => (
        <EgresoCard key={egreso.id} egreso={egreso} />
      ))}
    </div>
  );
};
