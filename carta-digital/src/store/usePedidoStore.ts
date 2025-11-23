import { Pedido } from '@/interface';
import { create } from 'zustand';

interface PedidoStore {
  pedidoSeleccionado: Pedido | null;
  setPedidoSeleccionado: (pedido: Pedido | null) => void;

  modalAbierto: boolean;
  openModal: (pedido: Pedido) => void;
  closeModal: () => void;
}

export const usePedidoStore = create<PedidoStore>((set) => ({
  pedidoSeleccionado: null,
  setPedidoSeleccionado: (pedido) => set({ pedidoSeleccionado: pedido }),

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
