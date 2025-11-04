import { Rotiseria } from "@/interface/Rotiseria";
import { create } from "zustand";

interface RotiseriaStore {
    rotiseriaActive: Rotiseria | null,
    setRotiseria: (rotiseria: Rotiseria | null) => void
};

export const useRotiseriaStore = create<RotiseriaStore>((set) => ({
    rotiseriaActive: null,

    setRotiseria: (rotiseria) => set({ rotiseriaActive: rotiseria })
}));