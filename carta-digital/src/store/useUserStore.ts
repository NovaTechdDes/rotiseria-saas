import { Usuario } from "@/interface";
import { create } from "zustand";

interface UserStore {

    usuarioSeleccionado: Usuario | null;

    modalAbierto: boolean;
    openModal: (usuario?: Usuario) => void;
    cerrarModal: () => void;
};


export const useUsuarioStore = create<UserStore>((set) => ({
    usuarioSeleccionado: null,

    modalAbierto: false,
    openModal: (usuario) => set({
        usuarioSeleccionado: usuario,
        modalAbierto: true
    }),
    cerrarModal: () => set({
        usuarioSeleccionado: null,
        modalAbierto: false
    })
}))