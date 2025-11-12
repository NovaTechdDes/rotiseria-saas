'use client'
import AsideBar from '@/components/dashboard/ui/AsideBar'
import React, { useEffect } from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="flex min-h-screen">
            <AsideBar />
            <main className="p-6 bg-gray-50 ml-[200px] fiex-1 w-full">
                {children}
            </main>
        </div >
    )
}

export default DashboardLayout