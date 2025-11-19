import { create } from "zustand";

interface User {
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isLogin: boolean;

    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    setIsLogin: (value: boolean) => void;

    login: (data: { user: User; token: string }) => void;
    logout: () => void;
    restoreSession: (session: {
        user: User | null;
        token: string | null;
        isLogged: boolean;
    }) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    isLogin: false,

    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
    setIsLogin: (value) => set({ isLogin: value }),

    login: (data) =>
        set({
            token: data.token,
            user: data.user,
            isLogin: true,
        }),

    logout: () =>
        set({
            token: null,
            user: null,
            isLogin: false,
        }),

    restoreSession: (session) =>
        set({
            token: session.token,
            user: session.user,
            isLogin: session.isLogged,
        }),
}));
