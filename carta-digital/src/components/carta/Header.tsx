"use client"
import { useRotiseriaByDominio } from "@/hooks";

import Image from "next/image";
import { Clock, Map, MapPin, Phone, ShoppingCart } from "lucide-react";
import { useCarritoStore } from "@/store/useCarritoStore";
import { useRouter } from "next/navigation";
import { useRotiseriaStore } from "@/store";
import { Button } from "../ui/Button";

const initialState = {
    nombre: '',
    direccion: '',
    horario: '',
    logo: '',
    telefono: ''
}

export const Header = () => {
    const router = useRouter();
    const { rotiseriaActive } = useRotiseriaStore();
    const { openModal, productos } = useCarritoStore();
    const { nombre, direccion, horario, logo, telefono } = rotiseriaActive ?? initialState;

    const navegarLogin = () => {
        router.push('/login');
    }

    const handleOpenModal = () => {
        openModal()
    };

    return (
        <header className="flex px-5 justify-between border-gray-200 shadow-2xl border-b py-5">

            <div>
                <div className="flex items-center gap-5">
                    <Image src={logo} alt={nombre} className="w-15 rounded-lg h-15" width={10} height={10} />
                    <h1 style={{ color: rotiseriaActive?.color }} className='font-bold text-2xl'>Roseria {nombre}</h1>
                </div>

                <div className="mt-5 text-xs flex gap-5">
                    <div className="flex items-center gap-2">
                        <Clock size={15} />
                        <p>{horario}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone size={15} />
                        <p>{telefono}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin size={15} />
                        <p>{direccion}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 items-start">
                <div onClick={navegarLogin}>
                    <Button texto="Panel Admin" />
                </div>
                <div onClick={handleOpenModal}>
                    <Button icon={ShoppingCart} tipo="primary" />
                    {productos && productos?.length > 0 && (
                        <span className="inline-flex items-center justify-center ml-2 px-2 py-0.5 text-xs font-bold leading-none text-white bg-orange-600 rounded-full">{productos.length}</span>
                    )}
                </div>
            </div>

        </header>
    )
}
