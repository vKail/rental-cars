import { UseAuthStore } from "../context/auth-user-store"
import * as yup from 'yup'
import { IAuth } from "../models/IAuth";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const {login} = UseAuthStore();
    const router = useRouter()

    const initialValues : IAuth = {
        email: '',
        password: ''
    }
    
    const validationSchema = yup.object().shape({
        email: yup.string().email().required('La dirección de correo es requerida'),
        password: yup.string().required('La contraseña es requerida')
    })

    const onSubmit = async (values: IAuth) => {
        login(values)
    }

    return {
        initialValues,
        validationSchema,
        onSubmit
    }

}