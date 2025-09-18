import { create } from 'zustand';
import { AppStore } from '@/types';

export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  error: null,
  setError: (error: string | null) => set({ error }),
}));
