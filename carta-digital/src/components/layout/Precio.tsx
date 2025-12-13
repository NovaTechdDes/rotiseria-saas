import React from 'react';
import { TarjetaPrecio } from './TarjetaPrecio';

export const Precio = () => {
  return (
    <div className="text-black mt-32">
      <div>
        <h2 className="text-4xl font-bold">Precios simples y transparentes</h2>
        <p className="text-slate-500">Sin costos ocultos. Sin contratos largos. Cancela cuando quieras.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        <TarjetaPrecio
          precio={25000}
          title="Básico"
          subtitulo="Perfecto para empezar"
          lista={['Gestion de productos', 'Control de Pedidos', 'Reportes Avanzados', 'Control de Egresos', 'Carta Digital']}
          aumento={false}
        />
        <TarjetaPrecio precio={+15000} title="Mesas" subtitulo="Si cuentas con mesas" lista={['Plan Basico', 'Gestion de Mezas']} aumento={true} />
        <TarjetaPrecio
          precio={+15000}
          title="Impresion de tickets"
          subtitulo="Si cuentas con Impresora Termica"
          lista={['Plan Basico', 'Impresion termica automatica al obtener un pedido']}
          aumento={true}
        />
      </div>
    </div>
  );
};
