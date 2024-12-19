import toast from "react-hot-toast"
import { AuthDataSourceImpl } from "../services/DataSource"
import { useRouter } from "next/navigation"

export const useVerifyEmail = () => {
    const router = useRouter()
    
    const onSubmit = async (token: string) => {
        try {
            await AuthDataSourceImpl.getInstance().verifyEmail(token)
            toast.success('Email verificado con éxito')
            router.push('/login')
        } catch (error) {
            toast.error('Error al verificar el email') 
        }
    }

    return {
        onSubmit
    }
}