import { useEgresoStore, useRotiseriaStore } from '@/store';
import { X } from 'lucide-react'
import React, { useEffect, useEffectEvent, useState } from 'react'
import { Button } from '../../ui/Button';
import { useForm, useMutateEgresos, useTipoEgresos } from '@/hooks';
import { Egreso } from '@/interface';

const initialState: Egreso = {
    created_at: new Date().toISOString().split('T')[0],
    descripcion: '',
    importe: 0,
    tipoEgresoId: 0,
    rotiseriaId: 0

}

const ModalEgreso = () => {
    const { closeModal, egresoSeleccionado } = useEgresoStore();
    const { rotiseriaActive } = useRotiseriaStore();
    const { descripcion, formState, tipoEgresoId, created_at, importe, onInputChange, onResetForm } = useForm(egresoSeleccionado ?? initialState);
    const { data: tipoEgresos, isLoading } = useTipoEgresos();
    const { agregarEgreso } = useMutateEgresos();
    const { mutateAsync: agregar, isPending } = agregarEgreso;

    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        rotiseriaActive && onInputChange({ target: { name: 'rotiseriaId', value: rotiseriaActive.id } })
    }, [rotiseriaActive])

    const cerrarModal = () => {
        onResetForm();
        closeModal();
    };

    const handleAddEgreso = async (e: React.FormEvent) => {
        e.preventDefault();

        if (descripcion === '') return setError(true)
        if (importe <= 0) return setError(true)
        if (tipoEgresoId === 0) return setError(true)

        const res = await agregar(formState);


        if (res) {
            onResetForm();
            closeModal();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 ">
            <div className="bg-white p-8 rounded shadow-lg min-w-[500px]">

                <div className='flex justify-between'>
                    <h2 className='text-xl font-bold text-orange-500'>Nuego Egreso</h2>
                    <X className='cursor-pointer hover:scale-110' onClick={cerrarModal} />
                </div>

                <form action="" className='mt-5 flex flex-col gap-5' onSubmit={handleAddEgreso}>
                    <div>
                        <label htmlFor="fecha">Fecha</label>
                        <input value={created_at as string} onChange={onInputChange} type="date" placeholder='fecha' className='w-full border border-gray-300 rounded-lg px-2 py-1' name="created_at" id="created_at" />
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripcion *</label>
                        <input value={descripcion} onChange={onInputChange} type="text" placeholder='Descripcion' className='w-full border border-gray-300 rounded-lg px-2 py-1' name="descripcion" id="descripcion" />
                        {error && descripcion === '' && <p className='text-red-500'>La descripcion es obligatoria</p>}
                    </div>
                    <div>
                        <label htmlFor="importe">Importe *</label>
                        <input type="number" value={importe} onChange={onInputChange} placeholder='0.00' className='w-full border border-gray-300 rounded-lg px-2 py-1' name="importe" id="importe" />
                        {error && importe <= 0 && <p className='text-red-500'>El importe debe ser mayor a 0</p>}
                    </div>
                    <div>
                        <label htmlFor="tipo">Tipo</label>
                        <select value={tipoEgresoId} onChange={onInputChange} className='w-full border border-gray-300 rounded-lg px-2 py-1' name="tipoEgresoId" id="tipoEgresoId">
                            <option value="">---Seleccionar un tipo---</option>{
                                tipoEgresos?.map(tipo => (
                                    <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                ))
                            }
                        </select>
                        {error && tipoEgresoId === 0 && <p className='text-red-500'>Falta seleccionar un tipo de egreso</p>}
                    </div>


                    <div className='flex gap-10 mt-2'>
                        <Button texto='Cancelar' onClick={cerrarModal} />
                        <Button texto='Crear' tipo='primary' />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ModalEgreso