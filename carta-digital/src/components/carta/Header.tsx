"use client"
import { useRotiseriaByDominio } from "@/hooks";
import { Button } from "../ui/Button"
import Image from "next/image";
import { Clock, Map, MapPin, Phone, ShoppingCart } from "lucide-react";

interface Props {
    rotiseria: string;
}

export const Header = ({ rotiseria }: Props) => {

    const { data, isLoading } = useRotiseriaByDominio(rotiseria);

    if (!data) return;

    const { nombre, direccion, horario, logo, telefono } = data;

    return (
        <header className="flex px-5 justify-between border-gray-200 shadow-2xl border-b py-5">
            <div>
                <div className="flex items-center gap-5">
                    <Image src={logo} alt={nombre} className="w-15 rounded-lg h-15" width={10} height={10} />
                    <h1 className="text-orange-700 font-bold text-2xl">Roseria {nombre}</h1>
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
                <Button texto="Panel Admin" />
                <Button icon={ShoppingCart} tipo="primary" />
            </div>
        </header>
    )
}
