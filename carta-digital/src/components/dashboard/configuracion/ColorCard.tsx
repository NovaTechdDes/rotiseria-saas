'use client'
import { useMutateRotiseria } from "@/hooks/rotiserias/useMutateRotiseria";
import { useRotiseriaStore } from "@/store";


interface Props {
    color: string;
    texto: string;
}

const ColorCard = ({ color, texto }: Props) => {
    const { rotiseriaActive } = useRotiseriaStore();
    const { modificarRotiseriaMutation } = useMutateRotiseria();
    const { mutateAsync: modificar, isPending } = modificarRotiseriaMutation

    const handlePutColor = () => {
        if (!rotiseriaActive) return;

        const { color: colorPrimario, ...rotiseriaSinColor } = rotiseriaActive;
        modificar({ color, ...rotiseriaSinColor });
    };

    return (
        <div onClick={handlePutColor} className={`border border-[${rotiseriaActive?.color === color ? color : ''}] gap-5 flex flex-col items-center py-2 bg-[${rotiseriaActive?.color === color ? color : ''}]/30 rounded-lg`}>
            <div className={`w-10 h-10 rounded-full bg-[${color}]`}></div>
            <p>{texto}</p>
        </div>
    )
}

export default ColorCard