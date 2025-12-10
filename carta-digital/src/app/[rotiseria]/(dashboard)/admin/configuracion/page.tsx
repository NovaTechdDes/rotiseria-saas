'use client';
import React, { useState } from 'react';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import { TipoEgresoList } from '@/components/admin/configuracion/TipoEgresoList';
import { TipoEgresoForm } from '@/components/admin/configuracion/TipoEgresoForm';
import { TipoEgreso } from '@/interface';
import { useMutateTipoEgresos } from '@/hooks/tipoEgresos/useMutateTipoEgresos';
import { useTipoEgresos } from '@/hooks/tipoEgresos/useTipoEgresos';
import Swal from 'sweetalert2';

const ConfiguracionPage = () => {
  const { rotiseriaActive } = useRotiseriaStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoEgresoToEdit, setTipoEgresoToEdit] = useState<TipoEgreso | null>(null);

  const { agregarTipoEgreso, modificarTipoEgreso } = useMutateTipoEgresos();
  const { data: tiposEgresos, isLoading } = useTipoEgresos();

  if (!rotiseriaActive) return null;

  const handleAddTipo = () => {
    setTipoEgresoToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditTipo = (tipo: TipoEgreso) => {
    setTipoEgresoToEdit(tipo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTipoEgresoToEdit(null);
  };

  const handleSubmit = async (tipo: TipoEgreso): Promise<boolean> => {
    try {
      if (tipo.id) {
        await modificarTipoEgreso.mutateAsync(tipo);
        Swal.fire(
          'Actualizado',
          'El tipo de egreso ha sido actualizado correctamente',
          'success'
        );
      } else {
        await agregarTipoEgreso.mutateAsync(tipo);
        Swal.fire(
          'Creado',
          'El tipo de egreso ha sido creado correctamente',
          'success'
        );
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Configuración</h1>
        <p className="text-gray-500 mt-1">
          Gestiona los tipos de egresos y personaliza tu rotisería
        </p>
      </div>

      {/* Tipos de Egresos Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Tipos de Egresos</h2>
          <button
            onClick={handleAddTipo}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out flex items-center gap-2"
          >
            <span>+</span> Agregar Tipo
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
          </div>
        ) : (
          <TipoEgresoList
            tiposEgresos={tiposEgresos || []}
            onEdit={handleEditTipo}
          />
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TipoEgresoForm
          rotiseriaId={rotiseriaActive.id}
          tipoEgresoToEdit={tipoEgresoToEdit}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ConfiguracionPage;
