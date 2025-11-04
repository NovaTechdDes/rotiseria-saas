import { Categoria } from "@/interface";
import { create } from "zustand";

interface CategoriaStore {
    categoriaSeleccionada: number | null,
    setCategoriaSeleccionada: (categoriaId: number | null) => void,

    modalAbierto: boolean,
    openModal: (categoria: Categoria) => void;
    closeModal: () => void
};


export const useCategoriaStore = create<CategoriaStore>((set) => ({
    categoriaSeleccionada: 0,
    setCategoriaSeleccionada: (categoriaId) => set({ categoriaSeleccionada: categoriaId }),

    modalAbierto: false,
    openModal: (categoria) => set({
        modalAbierto: true,
        categoriaSeleccionada: categoria?.id,
    }),
    closeModal: () => set({
        modalAbierto: false,
        categoriaSeleccionada: null
    })
}))