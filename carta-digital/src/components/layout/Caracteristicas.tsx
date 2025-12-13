import React from 'react';
import { ItemCaracteristica } from './ItemCaracteristica';
import { Box, ChartColumnDecreasing, ShoppingBag, Smartphone, TrendingUp, Users } from 'lucide-react';

const Caracteristicas = () => {
  return (
    <div className="mt-32" id="caracteristicas">
      <div className="text-black flex flex-col gap-3 my-5">
        <h2 className="text-4xl font-bold">Todo lo que necesitas en un solo lugar</h2>
        <p className="text-slate-500">Funcionalidades diseñadas especificamente para simplificar la gestion diaria de tu rotiseria</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ItemCaracteristica
          icon={<Box size={50} color="orange" />}
          title="Gestion de productos"
          description="Administra tu carta completa con precios, categorías, imágenes y disponibilidad en tiempo real"
        />
        <ItemCaracteristica
          icon={<ShoppingBag size={50} color="orange" />}
          title="Control de Pedidos"
          description="Recibe, procesa y gestiona todos tus pedidos desde una interfaz simple e intuitiva"
        />
        <ItemCaracteristica
          icon={<ChartColumnDecreasing size={50} color="orange" />}
          title="Reportes Avanzados"
          description="Visualiza tus ventas, productos más vendidos y márgenes de ganancia con gráficos detallados"
        />
        <ItemCaracteristica
          icon={<TrendingUp size={50} color="orange" />}
          title="Control de Egresos"
          description="Registra y categoriza todos tus gastos para tener visibilidad completa de tu negocio"
        />
        <ItemCaracteristica icon={<Smartphone size={50} color="orange" />} title="Carta Digital" description="Tu menú online actualizable al instante, optimizado para móviles y fácil de compartir" />
        <ItemCaracteristica icon={<Users size={50} color="orange" />} title="Multi Usuario" description="Invita a tu equipo y gestiona permisos para trabajar colaborativamente" />
      </div>
    </div>
  );
};

export default Caracteristicas;
