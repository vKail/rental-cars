import * as yup from 'yup'
import { AuthDataSourceImpl } from '../services/DataSource'
import { IRecoveryEmail, IRecoveryPassword } from '../models/IRecovery'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'



export const useChangePassword = () => {
    const router = useRouter()
    const initialValues : Partial<IRecoveryPassword> = {
        password: '',
        password_confirmation: '',
        reset_password_token: ''
    }
    const validationSchema = yup.object().shape({
       password: yup.string().required('La contraseña es requerida'),
       password_confirmation: yup.string().required('La confirmación de la contraseña es requerida')
    })

    const onSubmit = async (values: Partial<IRecoveryPassword>, token: string) => {
        values.reset_password_token = token
        try {
            await AuthDataSourceImpl.getInstance().changePassword(values)
            router.push('/login')
            toast.success('Contraseña cambiada con éxito')
        } catch (error) {
            toast.error('Error al cambiar la contraseña') 
        }
    }
    return {
        initialValues,
        validationSchema,
        onSubmit
    }
}