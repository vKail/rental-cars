import { create, StateCreator } from "zustand"
import { IAuth } from "../models/IAuth"
import { IUser } from "../models/IUser"
import { createJSONStorage, persist } from "zustand/middleware"
import { AuthDataSourceImpl } from "../services/DataSource"

export interface AuthStore {
    user: IUser | null
    setUser : (user: IUser) => void
    loading: boolean
    login: (data: IAuth) => void
    signup: (data: IUser) => void
    logout: () => void
    
}

export const DEFAULT_USER : IUser  | null = null

export const STORE_NAME = 'user'

export const UseAuthStore = create<AuthStore>(
    persist(
        (set, get) => ({
            user: DEFAULT_USER,
            loading: false,
            setUser: (user: IUser) => set({ user }),
            login: async (data: IAuth) => {
                set({ loading: true })
                const user = await AuthDataSourceImpl.getInstance().login(data)
                set({ user, loading: false })
            },
            signup: async (data: IUser) => {
                set({ loading: true })
                const user = await AuthDataSourceImpl.getInstance().signup(data)
                set({ user, loading: false })
            },
            logout: () => {
                set({ user: DEFAULT_USER })
            }
        }),
        {
            name: STORE_NAME,
            storage: createJSONStorage(() => sessionStorage),
        },
    ) as StateCreator<AuthStore>
        
)