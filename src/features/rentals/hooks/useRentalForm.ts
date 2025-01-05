import * as yup from "yup";
import { IRental, IRentalCreate, IRentalUpdate, Damage, RentalStatus } from "../models/IRental";
import { useRouter } from "next/navigation";
import { useRentalStore } from "../context/use-rentals-store";

export const useRentalForm = (currentRental?: IRental) => {
    const { addRental, updateRental } = useRentalStore();
    const router = useRouter();

    const createDefaultValues: IRentalCreate = {
        reservation_id: 0,
        car_status: RentalStatus.GOOD,
        initial_odometer: 0,
        final_odometer: 0,
        rate_id: 0,
    };

    const updateDefaultValues: IRentalUpdate = currentRental ? {
        id: currentRental.id,
        reservation_id: currentRental.reservation_id,
        actual_refund_date: currentRental.actual_refund_date,
        car_status: currentRental.car_status,
        initial_odometer: currentRental.initial_odometer,
        final_odometer: currentRental.final_odometer,
        rate_id: currentRental.rate_id,
        damages: currentRental.damages || []
    } : {
        id: 0,
        reservation_id: 0,
        actual_refund_date: new Date(),
        car_status: RentalStatus.GOOD,
        initial_odometer: 0,
        final_odometer: 0,
        rate_id: 0,
        damages: []
    };

    const createValidationSchema = yup.object().shape({
        car_status: yup.number()
            .required("El estado es requerido")
            .oneOf(Object.values(RentalStatus).filter(v => !isNaN(Number(v))) as number[]),
        initial_odometer: yup.number()
            .required("El odómetro inicial es requerido")
            .min(0),
        rate_id: yup.number()
            .required("La tarifa es requerida")
            .min(1)
    });

    const updateValidationSchema = yup.object().shape({
        car_status: yup.number()
            .required("El estado es requerido")
            .oneOf(Object.values(RentalStatus).filter(v => !isNaN(Number(v))) as number[]),
        initial_odometer: yup.number()
            .required("El odómetro inicial es requerido")
            .min(0),
        final_odometer: yup.number()
            .required("El odómetro final es requerido")
            .min(yup.ref('initial_odometer'), "El odómetro final debe ser mayor al inicial"),
        rate_id: yup.number()
            .required("La tarifa es requerida")
            .min(1),
        actual_refund_date: yup.date()
            .required("La fecha de devolución es requerida"),
        damages: yup.array().of(
            yup.object().shape({
                damage_type: yup.string().required("El tipo de daño es requerido"),
                value: yup.number()
                    .required("El valor es requerido")
                    .min(0, "El valor debe ser positivo")
            })
        )
    });

    const onSubmit = (values: IRentalCreate | IRentalUpdate, reservation_id?: number) => {
        const rentalValues = {
            ...values,
            reservation_id
        };
        if ('damages' in values) {
            // Es una actualización
            updateRental(currentRental!.reservation_id, values as IRentalUpdate);
        } else {
            // Es una creación
            addRental(values as IRentalCreate);
        }
        router.push("/dashboard/rentals/view");
    };

    return {
        defaultValues: currentRental ? updateDefaultValues : createDefaultValues,
        validationSchema: currentRental ? updateValidationSchema : createValidationSchema,
        onSubmit,
    };
}