
import React from 'react'
import { useRotiseriaByDominio } from '@/hooks';

import { Header } from '@/components/carta/Header';

interface Props {
  params: { rotiseria: string }
}

const RotiseriaPage = ({ params }: Props) => {

  return (
    <div className='h-screen bg-white text-black'>

      <Header rotiseria={params.rotiseria} />

    </div>
  )
}

export default RotiseriaPage