import { create } from "zustand";

interface ModalState {
    showModal: boolean,
    selectedId: string | null
    openModal: (id: string) => void
    closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
    showModal: false,
    selectedId: null,
    openModal: (id: string) => set({ showModal: true, selectedId: id }),
    closeModal: () => set({ showModal: false, selectedId: null })
}))