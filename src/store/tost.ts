import { create } from 'zustand';

interface ToastStore {
  isVisible: boolean;
  title: string;
  message: string;
  showToast: (title: string, message: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  isVisible: false,
  title: '',
  message: '',
  showToast: (title: string, message: string) => {
    set({ isVisible: true, title, message });
  },
  hideToast: () => {
    set({ isVisible: false });
  },
}));
