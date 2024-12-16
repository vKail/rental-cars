import { create, StateCreator } from "zustand";
import { IAuth } from "../models/IAuth";
import { IUser } from "../../users/models/IUser";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthDataSourceImpl } from "../services/DataSource";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosClient } from "@/core/infrestructure/http/AxiosClient";
import { IRegister } from "../models/IRegister";

export interface AuthStore {
  user: Partial<IUser> | null;
  setUser: (user: IUser) => void;
  loading: boolean;
  login: (data: IAuth) => Promise<boolean>;
  signup: (data: IRegister) => void;
  logout: () => void;
}

export const DEFAULT_USER: IUser | null = null;

export const STORE_NAME = "user";

export const UseAuthStore = create<AuthStore>(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      loading: false,
      setUser: (user: IUser) => set({ user }),
      login: async (data: IAuth) : Promise<boolean> => {
        set({ loading: true });
        try {
          const user = await AuthDataSourceImpl.getInstance().login(data);
          set({ user, loading: false });
          return true;
        } catch (error) {
          toast.error("Usuario o contraseña incorrecta");
          return false
        }
      },
      signup: async (data: IRegister) => {
        set({ loading: true });
        const user = await AuthDataSourceImpl.getInstance().signup(data);
        set({ user, loading: false });
      },
      logout: () => {
        set({ user: DEFAULT_USER });
        AxiosClient.setAccessToken('');
        sessionStorage.clear();
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<AuthStore>,
);
