import * as yup from 'yup'
import { AuthDataSourceImpl } from '../services/DataSource'
import { IRecoveryEmail } from '../models/IRecovery'
import toast from 'react-hot-toast'



export const useRecovery = () => {
    const initialValues : IRecoveryEmail = {
        email : ''
    }
    const validationSchema = yup.object().shape({
        email: yup.string().email().required('La dirección de correo es requerida')
    })

    const onSubmit = async (values: IRecoveryEmail) => {
        try {
            AuthDataSourceImpl.getInstance().recoveryPassword(values)
            toast.success('Correo enviado con éxito')
        } catch (error) {
            toast.error('Error al enviar el correo')
        }
    }
    return {
        initialValues,
        validationSchema,
        onSubmit
    }
}