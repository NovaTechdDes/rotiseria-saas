import { Producto } from '@/interface';
import { create } from 'zustand';

interface ProductoStore {
  productoSeleccionada: Producto | null;
  setProductoSeleccionado: (producto: Producto | null) => void;

  filtro: string;
  setFiltro: (texto: string) => void;

  modalAbierto: boolean;
  openModal: (producto?: Producto) => void;
  closeModal: () => void;
}

export const useProductoStore = create<ProductoStore>((set) => ({
  productoSeleccionada: null,
  setProductoSeleccionado: (producto) =>
    set({ productoSeleccionada: producto }),

  filtro: '',
  setFiltro: (texto) =>
    set({
      filtro: texto,
    }),

  modalAbierto: false,
  openModal: (producto) =>
    set({
      productoSeleccionada: producto,
      modalAbierto: true,
    }),
  closeModal: () =>
    set({
      productoSeleccionada: null,
      modalAbierto: false,
    }),
}));
