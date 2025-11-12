import { Egreso } from "@/interface"
import { create } from "zustand";



interface EgresoStore {
    egresoSeleccionado: Egreso | null;
    setEgresoSeleccionado: (egreso: Egreso | null) => void;

    buscador: string;
    setBuscador: (texto: string) => void;

    desde: string;
    hasta: string;

    setDesde: (desde: string) => void;
    setHasta: (desde: string) => void;

    total: number;
    setTotal: (precio: number) => void;

    modalAbierto: boolean;
    openModal: (egreso?: Egreso) => void;
    closeModal: () => void;
}

export const useEgresoStore = create<EgresoStore>((set) => ({

    egresoSeleccionado: null,
    setEgresoSeleccionado: (egreso) => set({
        egresoSeleccionado: egreso
    }),

    buscador: '',
    setBuscador: (texto) => set({
        buscador: texto.toUpperCase()
    }),

    desde: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10),
    hasta: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10),

    setDesde: (fecha) => set({
        desde: fecha
    }),
    setHasta: (fecha) => set({
        hasta: fecha
    }),

    total: 0,
    setTotal: (precio) => set({
        total: precio
    }),

    modalAbierto: false,
    openModal: (egreso) => set({
        egresoSeleccionado: egreso ?? null,
        modalAbierto: true
    }),
    closeModal: () => set({
        egresoSeleccionado: null,
        modalAbierto: false
    }),

}))