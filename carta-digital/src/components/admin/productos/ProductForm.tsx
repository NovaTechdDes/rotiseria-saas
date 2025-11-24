import React, { useEffect } from 'react';
import { useForm } from '@/hooks/useForm';
import { Producto } from '@/interface';
import { useCategorias } from '@/hooks/categorias/useCategorias';
import Swal from 'sweetalert2';
import { useMutateProductos } from '@/hooks';
import { useRotiseriaStore } from '@/store';

interface Props {
  rotiseriaId: number;
  productToEdit?: Producto | null;
  onClose: () => void;
  onSubmit: (product: Producto) => Promise<boolean>;
}

const initialProduct: Producto = {
  nombre: '',
  descripcion: '',
  precio: 0,
  categoriaId: 0,
  rotiseriaId: 0,
  activo: true,
  imagenFile: null,
  imagen: '',
};

export const ProductForm = ({ productToEdit, onClose, onSubmit }: Props) => {
  const { rotiseriaActive } = useRotiseriaStore();
  const { data: categorias, isLoading } = useCategorias(rotiseriaActive?.id ?? 0);
  const { modificarProducto } = useMutateProductos();
  const { mutateAsync: modificarProductoAsync, isPending: modificarProductoPending } = modificarProducto;

  const { formState, onInputChange, onResetForm, nombre, descripcion, rotiseriaId, precio, categoriaId, activo, imagenFile } = useForm(productToEdit ?? initialProduct);

  //Cada vez que el id de la rotiseria cambia, se actualiza el formState
  useEffect(() => {
      onInputChange({target: {name: 'rotiseriaId', value: rotiseriaActive?.id ?? 0}});
  }, [rotiseriaActive]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nombre.trim().length === 0) return Swal.fire('Error', 'El nombre es obligatorio', 'error');
    if (precio <= 0) return Swal.fire('Error', 'El precio debe ser mayor a 0', 'error');
    if (categoriaId === 0) return Swal.fire('Error', 'Debe seleccionar una categoria', 'error');

    if (productToEdit) {
      const ok = await modificarProductoAsync(formState);
      if (ok) {
        onClose();
        onResetForm();
      }
    } else {
      const success = await onSubmit(formState as Producto);
      if (success) {
        onClose();
        onResetForm();
      }
    }
  };

  if (isLoading) return <p>Cargando categorias...</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{productToEdit ? 'Editar Producto' : 'Nuevo Producto'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" name="nombre" value={nombre} onChange={onInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea name="descripcion" value={descripcion} onChange={onInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input type="number" name="precio" value={precio} onChange={onInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select name="categoriaId" value={categoriaId} onChange={onInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black">
              <option value={0}>Seleccione una categoría</option>
              {categorias?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen</label>
            <input
              type="file"
              name="imagenFile"
              onChange={onInputChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" name="activo" checked={activo} onChange={onInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm text-gray-900">Activo</label>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Cancelar
            </button>
            {productToEdit ? (
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" disabled={modificarProductoPending}>
                {modificarProductoPending ? 'Modificando' : 'Modificar'}
              </button>
            ) : (
              <button type="submit" className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Guardar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
