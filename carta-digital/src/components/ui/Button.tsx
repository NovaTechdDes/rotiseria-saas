import React from 'react'
import { LucideIcon } from 'lucide-react'

interface Props {
    tipo?: 'primary' | 'delete';
    texto?: string;
    icon?: LucideIcon;
    disabled?: boolean
};

export const Button = ({ tipo, texto = '', icon: Icon, disabled = false, }: Props) => {
    if (tipo === 'primary') {
        return (
            <button disabled={disabled} className="border flex w-full justify-center gap-2 items-center rounded-lg   px-2 py-1 font-semibold bg-orange-500 text-white border-orange-300 cursor-pointer hover:bg-orange-600">
                {Icon && <Icon className="w-6 h-6 text-primary" />}
                {texto}
            </button>
        );
    };

    if (tipo === 'delete') {
        return (
            <button disabled={disabled} className="border w-full flex gap-2 items-center justify-center rounded-lg  px-2 py-1 font-semibold text-slate-700 border-gray-300 cursor-pointer hover:bg-orange-100">
                {Icon && <Icon className="w-6 h-6 text-red-500" />}
                {texto}
            </button>
        )
    }

    return (
        <button className="border w-full flex gap-2 items-center justify-center rounded-lg  px-2 py-1 font-semibold text-slate-700 border-gray-300 cursor-pointer hover:bg-orange-100">
            {Icon && <Icon className="w-6 h-6 text-primary" />}
            {texto}
        </button>
    )
}
