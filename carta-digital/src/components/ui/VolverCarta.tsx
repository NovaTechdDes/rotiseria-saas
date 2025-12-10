'use client';
import { ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';

export const VolverCarta = () => {
  return (
    <div className="hover:cursor-pointer mb-2 text-orange-500 hover:underline flex gap-2" onClick={() => redirect('/')}>
      <ArrowLeft />
      <p className="text-lg">Carta Principal</p>
    </div>
  );
};
