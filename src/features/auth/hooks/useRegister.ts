import { useRouter } from "next/navigation";
import { UseAuthStore } from "../context/auth-user-store";
import { IUser, IUserRegister } from "../../users/models/IUser"
import * as yup from 'yup'
import { IRegister } from "../models/IRegister";
import toast from "react-hot-toast";

export const useRegister = () => {
    const {signup} = UseAuthStore();
    const router = useRouter()
    const initialValues : IUserRegister = {
        email: '',
        password: '',
        name: '',
        lastname: '',
        address: '',
        phone: '',
        birthdate: new Date(),
        username: ''
    }

    const validationSchema = yup.object().shape({
        email: yup.string().email().required('La dirección de correo es requerida'),
        password: yup.string().required('La contraseña es requerida'),
        name: yup.string().required('El nombre es requerido'),
        lastname: yup.string().required('El apellido es requerido'),
        address: yup.string().required('La dirección es requerida'),
        phone: yup.string().required('El teléfono es requerido'),
        birthdate: yup.date().required('La fecha de nacimiento es requerida'),
        username: yup.string().required('El nombre de usuario es requerido')
    })

    const onSubmit = async (values: IUserRegister) => {
        signup(values)
        toast.success('Se envió un correo de confirmación')
        router.push('/')
    }

    return {
        initialValues,
        validationSchema,
        onSubmit
    }
}