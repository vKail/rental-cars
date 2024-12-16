import { useReservationStore } from "../context/reservation-store"
import { IReservationData } from "../models/IReservation"
import * as yup from 'yup'

export const useReservationForm = () => {
    const {addReservation} = useReservationStore()
    const initialValues : Omit<IReservationData, 'user_id' | 'vehicle_id'> = {
        reservation_date: new Date(),
        refund_date: new Date(),
    }

    const validationSchema = yup.object().shape({
        reservation_date: yup.date().required("La fecha de reserva es requerida"),
        refund_date: yup.date().required("La fecha de devolución es requerida"),
    })

    const onSubmit = (values: Omit<IReservationData, 'user_id' | 'vehicle_id'>, user_id : number, vehicle_id : number) => {
        const completedValues : IReservationData = {...values, user_id, vehicle_id}
        addReservation(completedValues)
    }

    return {
        initialValues,
        validationSchema,
        onSubmit
    }
}