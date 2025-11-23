import { create } from 'zustand';

interface ReporteStore {
  desde: string;
  hasta: string;

  setDesde: (desde: string) => void;
  setHasta: (hasta: string) => void;
}

export const useReporteStore = create<ReporteStore>((set) => ({
  desde: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10),
  hasta: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10),

  setDesde: (fecha) =>
    set({
      desde: fecha,
    }),
  setHasta: (fecha) =>
    set({
      hasta: fecha,
    }),
}));
