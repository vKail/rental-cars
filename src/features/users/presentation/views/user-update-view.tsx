import { useUserStore } from "../../context/user-store"
import { UserForm } from "../components/user-form"

export const UsersUpdateView = ({id} : {id: number}) => {
    const {users} = useUserStore(); 
    const currentUser = users.find(user => user.id === id);

    return (
        <div className="flex flex-col items-center justify-center p-10 bg-white">
            <h1 className="font-bold text-2xl p-2">Agregar un nuevo usuario</h1>
            <UserForm currentUser={currentUser}/>
        </div>
    )
}