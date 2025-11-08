'use client'
import React, { useEffect } from 'react'
import { useRotiseriaByDominio } from '@/hooks';

import { Header } from '@/components/carta/Header';
import { Categorias } from '@/components/carta/Categorias';
import { Productos } from '@/components/carta/Productos';
import { useCarritoStore } from '@/store/useCarritoStore';
import { ModalCarrito } from '@/components/carta/ModalCarrito';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import Loading from '@/components/ui/Loading';
import ModalClienteCarrito from '@/components/carta/ModalClienteCarrito';

const RotiseriaPage = () => {
  const { modalAbierto, modalClienteCarrito } = useCarritoStore();
  const { rotiseriaActive } = useRotiseriaStore();

  if (!rotiseriaActive) {
    return <Loading texto='Cargando...' />
  };

  return (
    <div className='h-screen bg-slate-200 text-black'>

      <Header rotiseria={rotiseriaActive} />

      <Categorias rotiseria={rotiseriaActive} />

      <Productos rotiseria={rotiseriaActive} />


      {modalAbierto && <ModalCarrito />}
      {modalClienteCarrito && <ModalClienteCarrito />}

    </div>
  )
}

export default RotiseriaPage