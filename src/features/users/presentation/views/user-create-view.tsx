import { UserForm } from "../components/user-form"

export const UsersCreateView = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10 bg-white">
            <h1 className="font-bold text-2xl p-2">Agregar un nuevo usuario</h1>
            <UserForm />
        </div>
    )
}