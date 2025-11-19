'use client';
import { useState } from 'react';
import { Navbar } from '@/components/layout/NavBar';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { ProductCardClient } from '@/components/products/ProductCardClient';
import Loading from '@/components/ui/Loading'; 
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import { useProductos, useCategorias } from '@/hooks';
import { useCarritoStore } from '@/store/useCarritoStore';
import { CartModal } from '@/components/cart/CartModal';
import { ClientDataModal } from '@/components/cart/ClientDataModal';

const RotiseriaPage = () => {
  // 1. Obtenemos la rotisería que cargó el Layout
  const { rotiseriaActive } = useRotiseriaStore();
  
  // 2. Hooks de Datos
  // si rotiseriaActive es null, no intenta buscar nada.
  const { data: productos, isLoading: loadingProductos } = useProductos(rotiseriaActive?.id ?? 0);
  const { data: categorias, isLoading: loadingCategorias } = useCategorias(rotiseriaActive?.id ?? 0);
  
  // Store del Carrito para la acción de "Agregar"
  const { setProductos: agregarAlCarrito } = useCarritoStore();

  // Estado local para filtros
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  // 3. Pantalla de Carga Inicial
  // Si no hay rotisería o están cargando los datos, mostramos el spinner
  if (!rotiseriaActive || loadingProductos || loadingCategorias) {
    return <div className="h-screen flex items-center justify-center"><Loading texto="Cargando carta..." /></div>;
  }

  // 4. Preparar datos para el Filtro
  // Transformamos los objetos Categoria en un array simple de nombres para el filtro
  const nombresCategorias = [...(categorias?.map(c => c.nombre) ?? [])];

  // 5. Lógica de Filtrado Real
  const productosFiltrados = categoriaActiva === 'Todos'
    ? productos
    : productos?.filter(p => p.Categoria?.nombre === categoriaActiva); 


  const handleAgregar = (producto: any) => {
     
     agregarAlCarrito({ producto, cantidad: 1 });
     
     alert(`¡${producto.nombre} agregado al carrito!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <Navbar 
        nombre={rotiseriaActive.nombre} 
        telefono={rotiseriaActive.telefono} 
        horario={rotiseriaActive.horario}
        logo={rotiseriaActive.logo}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Filtros */}
        <div className="mb-6 sticky top-[80px] z-40 bg-gray-50/95 backdrop-blur-sm py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <CategoryFilter 
                categorias={nombresCategorias} 
                categoriaActiva={categoriaActiva} 
                setCategoriaActiva={setCategoriaActiva} 
            />
        </div>

        {/* Grid de Productos */}
        {productosFiltrados && productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {productosFiltrados.map((producto) => (
                    <ProductCardClient 
                        key={producto.id}
                        nombre={producto.nombre}
                        descripcion={producto.descripcion}
                        precio={producto.precio}
                        imagen={producto.imagen || '/placeholder-comida.jpg'}
                        onAdd={() => handleAgregar(producto)}
                    />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-lg">No encontramos productos en esta categoría</p>
            </div>
        )}

      </main>

      {/* Modales */}
      <CartModal />
      <ClientDataModal />
    </div>
  );
}

export default RotiseriaPage;