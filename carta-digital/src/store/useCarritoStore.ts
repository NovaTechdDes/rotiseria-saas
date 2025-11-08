import { Producto } from "@/interface";
import { create } from "zustand";


export interface ListaProductos {
    producto: Producto,
    cantidad: number
}

interface CarritoStore {

    total: number;
    productos: ListaProductos[] | null;
    setProductos: (producto: ListaProductos) => void;

    addItem: (id: number) => void;
    subsItem: (id: number) => void;

    modalAbierto: boolean;
    openModal: () => void;
    closeModal: () => void;

    modalClienteCarrito: boolean;
    openModalClienteCarrito: () => void;
    closeModalClienteCarrito: () => void;
};

const calcularTotal = (productos: ListaProductos[]): number => {
    if (!productos || productos.length === 0) return 0;
    return productos.reduce((acum, item) => acum + (item.cantidad * (item.producto.precio ?? 0)), 0);
};

export const useCarritoStore = create<CarritoStore>((set) => ({
    total: 0,
    productos: null,

    setProductos: (producto) => {
        set((state) => {
            const existe = state.productos?.find(elem => elem.producto.id === producto.producto.id);

            let nuevosProductos;
            if (existe) {
                nuevosProductos = state.productos?.map(prod =>
                    prod.producto.id === producto.producto.id
                        ? { ...prod, cantidad: prod.cantidad + producto.cantidad }
                        : prod
                ) ?? [];
            } else {
                nuevosProductos = [...(state.productos ?? []), { ...producto, cantidad: producto.cantidad || 1 }];
            }

            return {
                productos: nuevosProductos,
                total: calcularTotal(nuevosProductos)
            };
        })
    },
    addItem: (id) => {
        set((state) => {
            const existe = state.productos?.find(elem => elem.producto.id === id);

            if (existe) {
                const nuevosProductos = state.productos?.map(prod =>
                    prod.producto.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
                ) ?? [];
                return {
                    productos: nuevosProductos,
                    total: calcularTotal(nuevosProductos)
                };
            };
            return state;
        });
    },

    subsItem: (id) => {
        set((state) => {
            const existe = state.productos?.find(elem => elem.producto.id === id);

            if (existe) {
                let nuevosProductos;
                if (existe.cantidad === 1) {
                    nuevosProductos = state.productos?.filter(prod => prod.producto.id !== id) ?? [];
                } else {
                    nuevosProductos = state.productos?.map(prod => prod.producto.id === id ? { ...prod, cantidad: prod.cantidad - 1 } : prod) ?? [];
                }
                return {
                    productos: nuevosProductos,
                    total: calcularTotal(nuevosProductos)
                };
            };
            return state;
        })
    },

    modalAbierto: false,
    openModal: () => set({
        modalAbierto: true
    }),
    closeModal: () => set({
        modalAbierto: false
    }),

    modalClienteCarrito: false,
    openModalClienteCarrito: () => set({ modalClienteCarrito: true, modalAbierto: false }),
    closeModalClienteCarrito: () => set({ modalClienteCarrito: false }),


}))