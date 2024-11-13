import Link from "next/link"
import { AuthForm } from "../components/auth-form"


export const RegisterView = () => {
    return (
        <div className="flex flex-col h-screen  justify-center items-center bg-wite">
            <div className="flex flex-col justify-center w-full max-w-lg p-2 bg-white shadow-md border border-gray-200 rounded-lg ">
                <h1 className="text-2xl font-semibold ">Crea tu cuenta</h1>
                <AuthForm />
                <div>
                <span className="text-slate-900 text-sm">Ya tienes una cuenta?</span>
                <Link
                    href="/login"
                >
                    <span className="text-blue-400 text-sm"> <u>Inicia sesión</u></span>
                </Link>
                </div>
            </div>

            
        </div>
    )
}