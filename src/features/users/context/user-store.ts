import { createStore, StateCreator } from "zustand";
import { IUser } from "../models/IUser";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserDataSourceImpl } from "../services/DataSource";

interface UserStore {
  users: Partial<IUser>[];
  error: string;
  fetchUsers: () => void;
  createUser: (user: Omit<IUser, "id">) => void;
  updateUser: (id: number, user: Omit<IUser, "id">) => void;
  deleteUser: (id: number) => void;
}

const STORE_NAME = "users";
const DEFAULT_USERS: IUser[] = [];

export const useUserStore = createStore<UserStore>(
    persist(
        (set, get) => ({
            users : [],
            error : '',
            fetchUsers : async () => {
                const users = await UserDataSourceImpl.getInstance().getAllUsers();
                set({users: users})
            },
            createUser : async (user: Omit<IUser, "id"> ) => {
                const newUser = await UserDataSourceImpl.getInstance().createUser(user)
                set({users : [...get().users, newUser]})
            },
            updateUser : async (id: number, user: Omit<IUser, 'id'>) => {
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
