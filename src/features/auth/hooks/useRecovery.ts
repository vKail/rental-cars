import { DataSourceImpl } from '@/features/cars/services/DataSource'
import * as yup from 'yup'
import { AuthDataSourceImpl } from '../services/DataSource'
import { IRecoveryEmail } from '../models/IRecovery'



export const useRecovery = () => {
    const initialValues : IRecoveryEmail = {
        email : ''
    }
    const validationSchema = yup.object().shape({
        email: yup.string().email().required('La dirección de correo es requerida')
    })

    const onSubmit = async (values: IRecoveryEmail) => {
        AuthDataSourceImpl.getInstance().recoveryPassword(values)
    }
    return {
        initialValues,
        validationSchema,
        onSubmit
    }
}