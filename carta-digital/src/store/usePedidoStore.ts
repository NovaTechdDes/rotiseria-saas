import { Pedido } from '@/interface';
import { create } from 'zustand';

interface PedidoStore {
  pedidoSeleccionado: Pedido | null;
  setPedidoSeleccionado: (pedido: Pedido | null) => void;

  desde: string;
  hasta: string;

  setDesde: (desde: string) => void;
  setHasta: (hasta: string) => void;

  modalAbierto: boolean;
  openModal: (pedido: Pedido) => void;
  closeModal: () => void;
}

export const usePedidoStore = create<PedidoStore>((set) => ({
  pedidoSeleccionado: null,
  setPedidoSeleccionado: (pedido) => set({ pedidoSeleccionado: pedido }),

  desde: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10),
  hasta: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10),

  setDesde: (desde) => set({ desde }),
  setHasta: (hasta) => set({ hasta }),

  modalAbierto: false,
  openModal: (pedido) =>
    set({
      pedidoSeleccionado: pedido,
      modalAbierto: true,
    }),
  closeModal: () =>
    set({
      pedidoSeleccionado: null,
      modalAbierto: false,
    }),
}));
