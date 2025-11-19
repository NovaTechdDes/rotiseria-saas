'use client'
import React, { useEffect, use } from 'react' // 1. Importamos 'use'
import AsideBar from '@/components/dashboard/ui/AsideBar'
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import { useRotiseriaByDominio } from '@/hooks';
import Loading from '@/components/ui/Loading';

// 2. Definimos que params es una Promise
const DashboardLayout = ({ 
    children, 
    params 
}: { 
    children: React.ReactNode, 
    params: Promise<{ rotiseria: string }> 
}) => {
    
    // 3. Desempaquetamos la promesa con 'use()'
    const resolvedParams = use(params);
    const dominio = resolvedParams.rotiseria;

    const { setRotiseria } = useRotiseriaStore();
    
    // 4. Usamos el valor ya resuelto (dominio) en el hook
    const { data, isLoading } = useRotiseriaByDominio(dominio);

    useEffect(() => {
        if (data) setRotiseria(data)
    }, [data, setRotiseria]);

    if (isLoading) return <div className="h-screen w-full flex items-center justify-center"><Loading texto="Cargando Panel..." /></div>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AsideBar />
            <main className="flex-1 ml-64 p-8 w-full">
                {children}
            </main>
        </div >
    )
}

export default DashboardLayout