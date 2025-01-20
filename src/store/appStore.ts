import { create } from "zustand";

interface AppState {
  openAdminFormDialog: boolean;
  handleOpenAdminDialog: () => void;
  handleCloseAdminDialog: () => void;
}

const useAppStore = create<AppState>()((set) => ({
  openAdminFormDialog: false,
  handleOpenAdminDialog: () =>
    set((_state) => {
      return { openAdminFormDialog: true };
    }),
  handleCloseAdminDialog: () =>
    set((_state) => ({ openAdminFormDialog: false })),
}));

export default useAppStore;
