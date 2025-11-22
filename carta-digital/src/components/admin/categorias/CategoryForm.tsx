import React from 'react';
import { useForm } from '@/hooks/useForm';
import { Categoria } from '@/interface';
import Swal from 'sweetalert2';

interface Props {
    rotiseriaId: number;
    categoryToEdit?: Categoria | null;
    onClose: () => void;
    onSubmit: (category: Categoria) => Promise<boolean>;
}

const initialCategory: Categoria = {
    nombre: '',
    rotiseriaId: 0,
};

export const CategoryForm = ({ rotiseriaId, categoryToEdit, onClose, onSubmit }: Props) => {
    
    const { formState, onInputChange, onResetForm, nombre } = useForm(categoryToEdit || { ...initialCategory, rotiseriaId });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (nombre.trim().length === 0) return Swal.fire('Error', 'El nombre es obligatorio', 'error');

        const success = await onSubmit(formState as Categoria);
        if (success) {
            onClose();
            onResetForm();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{categoryToEdit ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            value={nombre} 
                            onChange={onInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Ej: Pizzas, Bebidas..."
                            autoFocus
                        />
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
