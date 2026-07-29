import { create } from 'zustand';

interface ConfiguratorState {
  selectedShape: string;
  setSelectedShape: (shape: string) => void;
  ringType: string;
  setRingType: (type: string) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  selectedShape: 'ThinRing',
  setSelectedShape: (shape) => set({ selectedShape: shape }),
  ringType: 'original',
  setRingType: (type) => set({ ringType: type }),
}));
