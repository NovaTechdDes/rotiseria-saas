'use client'
import AsideBar from '@/components/dashboard/ui/AsideBar'
import Loading from '@/components/ui/Loading';
import { useRotiseriaByDominio } from '@/hooks';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import React, { useEffect } from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='flex min-h-screen'>
            <AsideBar />
            <main className='flex-1 p-6 bg-gray-50'>{children}</main>
        </div>
    )
}

export default DashboardLayout