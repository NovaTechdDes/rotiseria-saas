'use client';
import { useState } from 'react';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import { ProductList } from '@/components/admin/productos/ProductList';
import { ProductForm } from '@/components/admin/productos/ProductForm';
import { Producto } from '@/interface';
import { useProductos } from '@/hooks/productos/useProductos';

const ProductosPage = () => {
  const { rotiseriaActive } = useRotiseriaStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Producto | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: productos, isLoading } = useProductos(rotiseriaActive?.id || 0);

  if (!rotiseriaActive) return null;

  const handleAddProduct = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Producto) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  // Filter products based on search term
  const filteredProducts = productos?.filter((p) => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-orange-600">Productos</h1>
          <p className="text-gray-500 mt-1">Total: {filteredProducts.length} productos</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition duration-150 ease-in-out flex items-center gap-2"
        >
          <span>+</span> Nuevo Producto
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-full">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-xl border-none shadow-sm bg-white focus:ring-2 focus:ring-orange-100 focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
        </div>
      </div>

      {/* Lista Productos */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <ProductList products={filteredProducts} onEdit={handleEditProduct} />
      )}

      {/* Modal */}
      {isModalOpen && <ProductForm rotiseriaId={rotiseriaActive.id} productToEdit={productToEdit} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductosPage;
