import { Producto } from '@/interface';
import { ListaProductos } from '@/store';
import { useEffect, useState, type ChangeEvent } from 'react';

type InputChage =
    ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    | {
        target: {
            name: string,
            value: string | number | ListaProductos[]
        }
    }


export function useForm<T extends object>(initialForm: T) {

    const [formState, setFormState] = useState(initialForm);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])


    const onInputChange = (e: InputChage) => {
        const target = e.target as HTMLInputElement;

        const { name, value, type, files, checked } = target;
        if (type === 'file' && files) {
            setFormState((prev) => ({
                ...prev,
                [name]: files[0]
            }))
        } else if (type === 'checkbox') {
            setFormState((prev) => ({
                ...prev,
                [name]: checked
            }))
        } else {

            setFormState((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}