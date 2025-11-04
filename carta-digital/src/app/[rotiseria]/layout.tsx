'use client'
import Loading from '@/components/ui/Loading';
import { useRotiseriaByDominio } from '@/hooks';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import React, { useEffect } from 'react'

const RotiseriaLayout = ({ children, params }: { children: React.ReactNode, params: Promise<{ rotiseria: string }> }) => {
    const resolvedParams = React.use(params);
    const rotiseria = resolvedParams?.rotiseria;
    const { setRotiseria, rotiseriaActive } = useRotiseriaStore();
    const { data, isLoading } = useRotiseriaByDominio(rotiseria);

    useEffect(() => {
        if (data) setRotiseria(data)
    }, [data, setRotiseria]);


    if (isLoading) return <Loading texto='Cargando Rotiseria...' />
    if (!data) return <div>No se encontro la rotiseria</div>

    return (
        <>{children}</>
    )
};

export default RotiseriaLayout;
