import { create } from "zustand";

interface TotalSumState {
    kitchenWood: number;
    kitchenAccessories: number;
    wardrobeWood: number;
    wardrobeAccessories: number;
}

interface TotalSumActions {
    setKitchenWood: (total: number) => void;
    setKitchenAccessory: (total: number) => void;
    setWardrobeWood: (total: number) => void;
    setWardrobeAccessories: (total: number) => void;
}

// Create a Zustand store with typed state and actions
const useTotalSumStore = create<TotalSumState & TotalSumActions>((set) => ({
    kitchenWood: 0,
    kitchenAccessories: 0,
    wardrobeWood: 0,
    wardrobeAccessories: 0,
    setKitchenWood: (total: number) => set({ kitchenWood: total }),
    setKitchenAccessory: (total: number) => set({ kitchenAccessories: total }),
    setWardrobeWood: (total: number) => set({ wardrobeWood: total }),
    setWardrobeAccessories: (total: number) => set({ wardrobeAccessories: total }),
}));

export default useTotalSumStore;
