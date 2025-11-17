import React from 'react'
import { LucideIcon } from 'lucide-react'
import { useRotiseriaStore } from '@/store';

interface Props {
    tipo?: 'primary' | 'delete' | '';
    texto?: string;
    icon?: LucideIcon;
    disabled?: boolean;
    onClick?: () => void;
};

export const Button = ({ tipo, texto = '', icon: Icon, disabled = false, onClick }: Props) => {

    const { rotiseriaActive } = useRotiseriaStore();

    if (tipo === 'primary') {
        return (
            <button onClick={onClick} disabled={disabled} className={`border flex w-full justify-center gap-2 items-center rounded-lg   px-2 py-1 font-semibold bg-[${rotiseriaActive?.color}] text-white border-[${rotiseriaActive?.color}] cursor-pointer hover:bg-[${rotiseriaActive?.color}] hover:opacity-90`}>
                {Icon && <Icon className="w-6 h-6 text-primary" />}
                {texto}
            </button>
        );
    };

    if (tipo === 'delete') {
        return (
            <button onClick={onClick} disabled={disabled} className="border text-red-500 w-full flex gap-2 items-center justify-center rounded-lg  px-2 py-1 font-semibold  border-gray-300 cursor-pointer hover:bg-orange-100">
                {Icon && <Icon className="w-6 h-6 text-red-500" />}
                {texto}
            </button>
        )
    }

    return (
        <button onClick={onClick} className="border w-full flex gap-2 items-center justify-center rounded-lg  px-2 py-1 font-semibold text-slate-700 border-gray-300 cursor-pointer hover:bg-orange-100">
            {Icon && <Icon className="w-6 h-6 text-primary" />}
            {texto}
        </button>
    )
}
