'use client'
import React from 'react'
import { useRotiseriaByDominio } from '@/hooks';

import { Header } from '@/components/carta/Header';
import { Categorias } from '@/components/carta/Categorias';
import { Productos } from '@/components/carta/Productos';
import { useCarritoStore } from '@/store/useCarritoStore';
import { ModalCarrito } from '@/components/carta/ModalCarrito';

const RotiseriaPage = ({ params }: { params: Promise<{ rotiseria: string }> }) => {
  const { rotiseria } = React.use(params);
  const { data } = useRotiseriaByDominio(rotiseria);
  const { modalAbierto } = useCarritoStore()

  if (!data) {
    return <div>Cargando...</div>
  }


  return (
    <div className='h-screen bg-slate-200 text-black'>

      <Header rotiseria={data} />

      <Categorias rotiseria={data} />

      <Productos rotiseria={data} />


      {modalAbierto && <ModalCarrito />}

    </div>
  )
}

export default RotiseriaPage