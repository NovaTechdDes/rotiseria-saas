'use client';
import { useState } from 'react';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import { CategoryList } from '@/components/admin/categorias/CategoryList';
import { CategoryForm } from '@/components/admin/categorias/CategoryForm';
import { Categoria } from '@/interface';
import { useMutateCategorias } from '@/hooks/categorias/useMutateCategoria';
import { useCategorias } from '@/hooks/categorias/useCategorias';
import { mensaje } from '@/helpers/mensaje';

const CategoriasPage = () => {
  const { rotiseriaActive } = useRotiseriaStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Categoria | null>(null);

  const { agregarCategoria, modificarCategoria } = useMutateCategorias();

  const { data: categorias, isLoading } = useCategorias(rotiseriaActive?.id || 0);
  if (!rotiseriaActive) return null;

  const handleAddCategory = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Categoria) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoryToEdit(null);
  };

  const handleSubmit = async (category: Categoria): Promise<boolean> => {
    try {
      if (category.id) {
        const { ok, msg } = await modificarCategoria.mutateAsync(category);
        if (ok) {
          mensaje(msg, 'success');
        } else {
          mensaje(msg, 'error');
        }
      } else {
        const { ok, msg } = await agregarCategoria.mutateAsync(category);
        if (ok) {
          mensaje(msg, 'success');
        } else {
          mensaje(msg, 'error');
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-orange-600">Categorías</h1>
          <p className="text-gray-500 mt-1">Total: {categorias?.length || 0} categorías</p>
        </div>
        <button
          onClick={handleAddCategory}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition duration-150 ease-in-out flex items-center gap-2"
        >
          <span>+</span> Nueva Categoría
        </button>
      </div>

      {/* Lista categoria */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <CategoryList categories={categorias || []} onEdit={handleEditCategory} />
      )}

      {/* Modal */}
      {isModalOpen && <CategoryForm rotiseriaId={rotiseriaActive.id} categoryToEdit={categoryToEdit} onClose={handleCloseModal} onSubmit={handleSubmit} />}
    </div>
  );
};

export default CategoriasPage;
