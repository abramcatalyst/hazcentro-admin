import { LoginResponseProfileType } from "src/types/auth";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  profile: LoginResponseProfileType | null;
  handleLogin: ({
    userProfile,
  }: {
    userProfile: LoginResponseProfileType;
  }) => void;
  handleLogout: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  profile: null,
  handleLogin: ({ userProfile }: { userProfile: LoginResponseProfileType }) =>
    set((_state) => {
      return {
        isAuthenticated: true,
        profile: userProfile,
      };
    }),
  handleLogout: () =>
    set((_state) => ({ isAuthenticated: false, profile: null })),
}));

export default useAuthStore;
