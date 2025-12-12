'use server';
import { startGetCategoriasByRotiseriaId, startGetRotiseriaForDominio } from '@/actions';
import { BuscadorProductos } from '@/components/cart/BuscadorProductos';
import { CartModal } from '@/components/cart/CartModal';
import { ClientDataModal } from '@/components/cart/ClientDataModal';
import { GridProductos } from '@/components/cart/GridProductos';
import { Navbar } from '@/components/layout/NavBar';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import Loading from '@/components/ui/Loading';
import { headers } from 'next/headers';

const RotiseriaPage = async () => {
  const currentDomain = (await headers()).get('host')?.split('.')[0];

  // 1. Obtenemos la rotisería que cargó el Layout
  const rotiseriaActive = await startGetRotiseriaForDominio(currentDomain || '');

  const categorias = await startGetCategoriasByRotiseriaId(rotiseriaActive?.id ?? 0);

  if (!rotiseriaActive || categorias.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading texto="Cargando carta..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar nombre={rotiseriaActive?.nombre ?? ''} telefono={rotiseriaActive?.telefono ?? ''} horario={rotiseriaActive?.horario ?? ''} logo={rotiseriaActive?.logo ?? ''} />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Buscador */}
        <BuscadorProductos />

        {/* Filtros */}
        <div className="mb-6 sticky top-[80px] z-40 bg-gray-50/95 backdrop-blur-sm py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <CategoryFilter categorias={categorias} />
        </div>

        {/* Grid de Productos */}
        <GridProductos rotiseriaId={rotiseriaActive?.id ?? 0} />
      </main>

      {/*Modales*/}
      <CartModal />
      <ClientDataModal rotiseriaId={rotiseriaActive?.id ?? 0} />
    </div>
  );
};

export default RotiseriaPage;
