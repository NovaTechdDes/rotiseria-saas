'use client';
import React, { useState } from 'react';
import { useRotiseriaStore } from '@/store/useRotiseriaStore';
import { EgresoList } from '@/components/admin/egresos/EgresoList';
import { EgresoForm } from '@/components/admin/egresos/EgresoForm';
import { Egreso } from '@/interface';
import { useMutateEgresos } from '@/hooks/egresos/useMutateEgresos';
import { useEgresos } from '@/hooks/egresos/useEgresos';

const EgresosPage = () => {
  const { rotiseriaActive } = useRotiseriaStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

  const [desde, setDesde] = useState(firstDay.toISOString().split('T')[0]);
  const [hasta, setHasta] = useState(today.toISOString().split('T')[0]);

  const { agregarEgreso } = useMutateEgresos();

  const { data: egresos, isLoading } = useEgresos(desde, hasta);

  if (!rotiseriaActive) return null;

  const handleAddEgreso = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (egreso: Egreso): Promise<boolean> => {
    try {
      const ok = await agregarEgreso.mutateAsync(egreso);
      if (ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const filteredEgresos = egresos?.filter((e) => e.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  const totalEgresos = filteredEgresos.reduce((acc, curr) => acc + curr.importe, 0);

  return (
    <div className="px-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-orange-600">Egresos</h1>
        <p className="text-gray-500 mt-1">Total: {filteredEgresos.length} egresos</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Total de Egresos</h2>
        <p className="text-2xl font-bold text-orange-600">
          {new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
          }).format(totalEgresos)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Filtrar por Fecha</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
            <input
              type="date"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="w-full p-2 border text-gray-700 border-gray-700 rounded-md focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
            <input
              type="date"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="w-full p-2 border text-gray-700 border-gray-700 rounded-md focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar gastos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 rounded-xl border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-orange-100 focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
        </div>
        <button
          onClick={handleAddEgreso}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-xl shadow-sm transition duration-150 ease-in-out flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <span>+</span> Nuevo Egreso
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <EgresoList egresos={filteredEgresos} />
      )}

      {/* Modal */}
      {isModalOpen && <EgresoForm rotiseriaId={rotiseriaActive.id} onClose={handleCloseModal} onSubmit={handleSubmit} />}
    </div>
  );
};

export default EgresosPage;
