import { create } from "zustand";

type universalStoreTypes = {
  write: (state: any) => void;
};

export const useUniversalStore = create<universalStoreTypes>((set) => ({
  write: (state) => set(state),
}));
