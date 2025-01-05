import { create, StateCreator } from "zustand";
import { IUser, IUserCreate } from "../models/IUser";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserDataSourceImpl } from "../services/DataSource";

interface UserStore {
  users: Partial<IUser>[];
  error: string;
  fetchUsers: () => void;
  createUser: (user: IUserCreate) => void;
  updateUser: (id: number, user: IUserCreate) => void;
  deleteUser: (id: number) => void;
}

const STORE_NAME = "users";
const DEFAULT_USERS: IUser[] = [];

export const useUserStore = create<UserStore>(
  persist(
    (set, get) => ({
      users: DEFAULT_USERS,
      error: "",
      fetchUsers: async () => {
        try {
          const users = await UserDataSourceImpl.getInstance().getAllUsers();
          set({ users: users });
        } catch (error) {
          console.log(error);
        }
      },
      createUser: async (user: IUserCreate) => {
        try {
          const newUser = await UserDataSourceImpl.getInstance().createUser(
            user
          );
          set({ users: [...get().users, newUser as Partial<IUser>] });
        } catch (error) {
          console.log(error);
        }
      },
      updateUser: async (id: number, user: IUserCreate) => {
        try {
          await UserDataSourceImpl.getInstance().updateUser(id, user);
        } catch (error) {
          console.log(error);
        }
      },
      deleteUser: async (id: number) => {
        try {
          const user = get().users.filter((user) => user.id != id);
          set({ users: user });
          await UserDataSourceImpl.getInstance().deleteUser(id);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    }
  ) as StateCreator<UserStore>
);
