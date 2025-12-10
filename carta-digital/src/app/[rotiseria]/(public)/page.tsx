import { categoriasActions, startGetProductosByRotiseriaId, startGetRotiseriaForDominio } from '@/actions';
import { BuscadorProductos } from '@/components/cart/BuscadorProductos';
import { CartModal } from '@/components/cart/CartModal';
import { ClientDataModal } from '@/components/cart/ClientDataModal';
import { Navbar } from '@/components/layout/NavBar';
import { ProductCardClient } from '@/components/products/ProductCardClient';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import Loading from '@/components/ui/Loading';
import { headers } from 'next/headers';

const { startGetCategoriasByRotiseriaId } = categoriasActions();

const RotiseriaPage = async () => {
  const currentDomain = (await headers()).get('host')?.split('.')[0];

  // 1. Obtenemos la rotisería que cargó el Layout
  const rotiseriaActive = await startGetRotiseriaForDominio(currentDomain || '');

  const productos = await startGetProductosByRotiseriaId(rotiseriaActive?.id ?? 0);
  const categorias = await startGetCategoriasByRotiseriaId(rotiseriaActive?.id ?? 0);

  // 3. Pantalla de Carga Inicial
  // Si no hay rotisería o están cargando los datos, mostramos el spinner

  if (!rotiseriaActive || productos.length === 0 || categorias.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading texto="Cargando carta..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar nombre={rotiseriaActive?.nombre ?? ''} telefono={rotiseriaActive?.telefono ?? ''} horario={rotiseriaActive?.horario ?? ''} logo={rotiseriaActive?.logo ?? ''} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Buscador */}
        <BuscadorProductos />

        {/* Filtros */}
        <div className="mb-6 sticky top-[80px] z-40 bg-gray-50/95 backdrop-blur-sm py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <CategoryFilter categorias={categorias} />
        </div>

        {/* Grid de Productos */}
        {productos && productos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {productos.map((producto) => (
              <ProductCardClient
                key={producto.id}
                id={producto.id || 0}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio}
                imagen={producto.imagen || '/placeholder-comida.jpg'}
                rotiseriaId={producto.rotiseriaId || 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-lg">No encontramos productos en esta categoría</p>
          </div>
        )}
      </main>

      {/*Modales*/}
      <CartModal />
      <ClientDataModal />
    </div>
  );
};

export default RotiseriaPage;
