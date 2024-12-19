import toast from "react-hot-toast"
import { AuthDataSourceImpl } from "../services/DataSource"

export const useVerifyEmail = () => {
    
    const onSubmit = async (token: string) => {
        try {
            await AuthDataSourceImpl.getInstance().verifyEmail(token)
            toast.success('Email verificado con éxito')
        } catch (error) {
            toast.error('Error al verificar el email') 
        }
    }

    return {
        onSubmit
    }
}