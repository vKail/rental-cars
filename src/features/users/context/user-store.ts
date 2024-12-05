import { create, StateCreator } from "zustand";
import { IUser } from "../models/IUser";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserDataSourceImpl } from "../services/DataSource";

interface UserStore {
  users: Partial<IUser>[];
  error: string;
  fetchUsers: () => void;
  createUser: (user: Partial<IUser>) => void;
  updateUser: (id: number, user: Partial<IUser>) => void;
  deleteUser: (id: number) => void;
}

const STORE_NAME = "users";
const DEFAULT_USERS: IUser[] = [];

export const useUserStore = create<UserStore>(
    persist(
        (set, get) => ({
            users : DEFAULT_USERS,
            error : '',
            fetchUsers : async () => {
                const users = await UserDataSourceImpl.getInstance().getAllUsers();
                set({users: users})
            },
            createUser : async (user: Partial<IUser> ) => {
                const newUser = await UserDataSourceImpl.getInstance().createUser(user)
                set({users : [...get().users, newUser]})
            },
            updateUser : async (id: number, user: Partial<IUser>) => {
                await UserDataSourceImpl.getInstance().updateUser(id, user)   
            },
            deleteUser : async (id: number) => {
                const user = get().users?.filter(user => user.id != id )
                set({users: user})
                await UserDataSourceImpl.getInstance().deleteUser(id)
            }
        }),
{
        name: STORE_NAME,
        storage: createJSONStorage(() => sessionStorage),
    },
    ) as StateCreator<UserStore>
    
);
