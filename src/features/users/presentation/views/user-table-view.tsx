import { useEffect } from "react";
import { useUserView } from "../../hooks/useUserView";
import { useUserStore } from "../../context/user-store";
import { UsersTable } from "../components/user-table";

export const UsersList = () => {
    const {users, fetchUsers} = useUserStore();
    const {onAdd} = useUserView();
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])
    return (
        <div className="flex-1 overflow-auto ">
            <div className="flex flex-row justify-between p-2">
                <h1 className="font-bold text-2xl">Lista de usuarios registrados</h1>
                <button className="transition-colors w-24 bg-new-black text-white p-2 rounded-lg hover:bg-new-back-hover"
                    onClick={() => onAdd()}
                >Nuevo</button>
            </div>
            <UsersTable users={users} />
        </div>
    )
}