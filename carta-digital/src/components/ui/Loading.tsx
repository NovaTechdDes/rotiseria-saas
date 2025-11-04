import React from 'react'

const Loading = ({ texto = 'Cargando...' }: { texto: string }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-lg font-semibold text-blue-700">{texto}</span>
        </div>
    )
}

export default Loading