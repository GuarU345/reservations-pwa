import { create } from "zustand"
import { persist } from "zustand/middleware";

interface User {
    name: string,
    email: string,
    role: string
}

interface AuthState {
    token: string | null,
    user: User | null,
    isLogin: boolean,
    setToken: (token: string) => void,
    setUser: (user: User | null) => void,
    setIsLogin: (isLogin: boolean) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isLogin: false,

            setToken: (token) => set({ token }),

            setUser: (user) => set({ user }),

            setIsLogin: (state) => set({ isLogin: state }),
        }),
        {
            name: 'auth',
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isLogin: state.isLogin,
            }),
        }
    )
);