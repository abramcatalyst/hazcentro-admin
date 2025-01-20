import { IToken } from "src/types/auth";
import { PERSIST_LOGIN } from "src/utils";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  persistLogin: boolean;
  profile: { user: IToken; accessToken: string } | null;
  handleLogin: ({
    userProfile,
    accessToken,
  }: {
    userProfile: IToken;
    accessToken: string;
  }) => void;
  handleLogout: () => void;
  handleChangePersistLogin: (answer: boolean) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  persistLogin: localStorage.getItem(PERSIST_LOGIN)
    ? Boolean(JSON.parse(localStorage.getItem(PERSIST_LOGIN) || ""))
    : false,
  profile: null,
  handleLogin: ({
    userProfile,
    accessToken,
  }: {
    userProfile: IToken;
    accessToken: string;
  }) =>
    set((_state) => {
      return {
        isAuthenticated: true,
        profile: { user: userProfile, accessToken: accessToken },
      };
    }),
  handleLogout: () =>
    set((_state) => ({ isAuthenticated: false, profile: null })),
  handleChangePersistLogin: (answer) => {
    localStorage.setItem(PERSIST_LOGIN, JSON.stringify(answer));
    set((_state) => ({ persistLogin: answer }));
  },
}));

export default useAuthStore;
