'use client'
import React, { useEffect, useState } from 'react'


import { useCarritoStore } from '@/store/useCarritoStore';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import Loading from '@/components/ui/Loading';
import { Categorias, Header, ModalCarrito, ModalClienteCarrito, Productos } from '@/components';

const RotiseriaPage = () => {
  const { modalAbierto, modalClienteCarrito } = useCarritoStore();
  const { rotiseriaActive } = useRotiseriaStore();

  const [buscador, setBuscador] = useState<string>('');

  if (!rotiseriaActive) {
    return <Loading texto='Cargando...' />
  };

  return (
    <div className='h-screen bg-slate-200 text-black'>

      <Header rotiseria={rotiseriaActive} />

      <div>
        <input onChange={e => setBuscador(e.target.value.toUpperCase())} type="text" placeholder='Buscar producto por nombre' className='bg-white w-full py-2 font-lg border border-gray-300 rounded-lg mx-10 mt-2 px-2' />
      </div>

      <Categorias rotiseria={rotiseriaActive} />

      <Productos buscador={buscador} rotiseria={rotiseriaActive} />


      {modalAbierto && <ModalCarrito />}
      {modalClienteCarrito && <ModalClienteCarrito />}

    </div>
  )
}

export default RotiseriaPage