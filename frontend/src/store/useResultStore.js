import { create } from "zustand";

const useResultStore = create((set) => ({
  res: null,
  setRes: (res) => set({ res }),
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
  clearSelectedNode: () => set({ selectedNode: null }),
}));
export { useResultStore };
